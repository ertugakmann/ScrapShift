from app.db import Base
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, Boolean
from datetime import datetime
from sqlalchemy.orm import relationship

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(Integer, ForeignKey("conversations.id"))
    sender_id = Column(Integer, ForeignKey("users.id"))
    body = Column(String)
    is_read = is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.now)

    conversation = relationship("Conversation", back_populates="messages")
    sender = relationship("User")