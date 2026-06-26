from datetime import datetime
from pydantic import BaseModel, ConfigDict
from typing import Optional

from app.schemas.common import UserBrief
from app.schemas.common import ListingBrief
from app.schemas.conversation.message import MessageResponse
from app.schemas.conversation.offer import OfferResponse

class ConversationCreate(BaseModel):
    listing: ListingBrief

class LastMessage(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    body: str
    created_at: datetime
    sender: UserBrief

class ConversationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    listing: ListingBrief
    buyer: UserBrief
    seller: UserBrief
    last_message: Optional[LastMessage] = None
    created_at: datetime

class ConversationContentResponse(BaseModel):
    conversation: ConversationResponse
    messages: list[MessageResponse]
    offers: list[OfferResponse]