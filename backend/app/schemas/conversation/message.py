from datetime import datetime
from pydantic import BaseModel
from app.schemas.common import UserBrief

class MessageCreate(BaseModel):
    body: str

class MessageResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
        
    id: int
    conversation_id: int
    sender_id: int 
    body: str
    is_read: bool
    created_at: datetime
