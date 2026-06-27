from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.dependencies.auth import get_current_user_ws
from app.dependencies.db import get_db
from app.models.conversation.conversation import Conversation
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

        try:
            while True:
                message = await websocket.receive()
                if message["type"] == "websocket.disconnect":
                    break
        finally:
            await manager.disconnect(conversation_id, websocket, user.id)

    except WebSocketDisconnect:
        # Auth failures from get_current_user_ws raise WebSocketDisconnect
        # before connect() is ever called, so no disconnect() needed here.
        pass

    finally:
        db.close()
