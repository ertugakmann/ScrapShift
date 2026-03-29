from datetime import datetime
from typing import Literal
from pydantic import BaseModel, ConfigDict
from app.schemas.common import UserBrief


class OfferCreate(BaseModel):
    amount: float

class OfferUpdate(BaseModel):
    status: Literal["accepted", "declined"]

class OfferResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    conversation_id: int
    sender_id: int
    amount: float
    status: Literal["pending", "accepted", "declined"]
    created_at: datetime
    updated_at: datetime