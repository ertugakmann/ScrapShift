from datetime import datetime
from pydantic import BaseModel, ConfigDict
from typing import Optional

from app.schemas.common import UserBrief

class ConversationCreate(BaseModel):
    listing_id: int

class LastMessage(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    body: str
    created_at: datetime
    sender: UserBrief

class ConversationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    listing_id: int
    buyer: UserBrief
    seller: UserBrief
    unread_count: int
    last_message: Optional[LastMessage] = None
    created_at: datetime