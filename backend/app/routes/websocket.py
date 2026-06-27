import json
from datetime import datetime

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.dependencies.auth import get_current_user_ws
from app.dependencies.db import get_db
from app.models.conversation.conversation import Conversation
from app.models.conversation.message import Message
from app.websocket.manager import manager

router = APIRouter(tags=["WebSocket"])


@router.websocket("/ws/conversations/{conversation_id}")
async def conversation_socket(
    websocket: WebSocket,
    conversation_id: int,
):
    db = next(get_db())

    try:
        user = await get_current_user_ws(websocket, db)

        conversation = (
            db.query(Conversation)
            .filter(Conversation.id == conversation_id)
            .first()
        )

        if conversation is None:
            await websocket.close(code=4004)
            return

        if user.id not in (conversation.buyer_id, conversation.seller_id):
            await websocket.close(code=4003)
            return

        await manager.connect(conversation_id, websocket, user.id)

        # When this user opens the conversation, mark any unread messages from
        # the other user as delivered+read and notify the sender in real time.
        unread = (
            db.query(Message)
            .filter(
                Message.conversation_id == conversation_id,
                Message.sender_id != user.id,
                Message.read_at == None,
            )
            .all()
        )
        if unread:
            now = datetime.now()
            for msg in unread:
                if msg.delivered_at is None:
                    msg.delivered_at = now
                msg.read_at = now
            db.commit()
            for msg in unread:
                await manager.broadcast(
                    conversation_id,
                    {
                        "type": "message_delivered",
                        "message_id": msg.id,
                        "delivered_at": msg.delivered_at.isoformat(),
                    },
                )
                await manager.broadcast(
                    conversation_id,
                    {
                        "type": "message_read",
                        "message_id": msg.id,
                        "read_at": msg.read_at.isoformat(),
                    },
                )

        try:
            while True:
                message = await websocket.receive()
                if message["type"] == "websocket.disconnect":
                    break
                if message["type"] == "websocket.receive" and message.get("text"):
                    try:
                        data = json.loads(message["text"])
                        if data.get("type") in ("typing_start", "typing_stop"):
                            await manager.broadcast(
                                conversation_id,
                                {"type": data["type"], "user_id": user.id},
                            )
                    except (json.JSONDecodeError, KeyError):
                        pass
        finally:
            await manager.disconnect(conversation_id, websocket, user.id)

    except WebSocketDisconnect:
        # Auth failures from get_current_user_ws raise WebSocketDisconnect
        # before connect() is ever called, so no disconnect() needed here.
        pass

    finally:
        db.close()
