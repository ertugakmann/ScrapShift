from fastapi import Cookie, Depends, HTTPException, WebSocket, WebSocketDisconnect, status
from sqlalchemy.orm import Session

from app.db import get_db
from app.models.user import User
from app.utils.auth import verify_access_token


def get_current_user(
    access_token: str | None = Cookie(default=None),
    db: Session = Depends(get_db),
) -> User:
    if not access_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )

    payload = verify_access_token(access_token)
    user = db.query(User).filter(User.id == payload["sub"]).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )

    return user


async def get_current_user_ws(websocket: WebSocket, db: Session) -> User:
    """
    Authenticate a WebSocket connection via the HttpOnly access_token cookie.

    Call this at the top of a WebSocket handler before accepting messages.
    On failure the connection is closed with code 4001 and WebSocketDisconnect
    is raised so the handler exits cleanly.
    """
    token = websocket.cookies.get("access_token")

    if not token:
        await websocket.close(code=4001)
        raise WebSocketDisconnect(code=4001)

    try:
        payload = verify_access_token(token)
    except HTTPException:
        await websocket.close(code=4001)
        raise WebSocketDisconnect(code=4001)

    user = db.query(User).filter(User.id == payload["sub"]).first()

    if not user:
        await websocket.close(code=4001)
        raise WebSocketDisconnect(code=4001)

    return user
