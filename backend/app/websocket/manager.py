from collections import defaultdict
from fastapi import WebSocket


class ConnectionManager:
    def __init__(self):
        self.connections: dict[int, list[WebSocket]] = defaultdict(list)
        self.user_connections: dict[int, int] = {}

    def _remove_socket(self, conversation_id: int, websocket: WebSocket) -> None:
        if websocket in self.connections[conversation_id]:
            self.connections[conversation_id].remove(websocket)
        if not self.connections[conversation_id]:
            del self.connections[conversation_id]

    async def connect(
        self, conversation_id: int, websocket: WebSocket, user_id: int
    ) -> None:
        await websocket.accept()
        self.connections[conversation_id].append(websocket)
        self.user_connections[user_id] = self.user_connections.get(user_id, 0) + 1
        if self.user_connections[user_id] == 1:
            await self.broadcast(
                conversation_id, {"type": "user_online", "user_id": user_id}
            )

    async def disconnect(
        self, conversation_id: int, websocket: WebSocket, user_id: int
    ) -> None:
        self._remove_socket(conversation_id, websocket)
        count = self.user_connections.get(user_id, 0) - 1
        if count <= 0:
            self.user_connections.pop(user_id, None)
            await self.broadcast(
                conversation_id, {"type": "user_offline", "user_id": user_id}
            )
        else:
            self.user_connections[user_id] = count

    async def broadcast(self, conversation_id: int, data: dict) -> None:
        dead_connections = []
        for connection in self.connections.get(conversation_id, []):
            try:
                await connection.send_json(data)
            except Exception:
                dead_connections.append(connection)
        for connection in dead_connections:
            self._remove_socket(conversation_id, connection)


manager = ConnectionManager()
