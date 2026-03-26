from app.db import Base
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime


class Offer(Base):
    __tablename__ = "offers"

    id = Column(Integer, primary_key=True, index)
    conversation_id = Column(Integer, ForeignKey("conversations.id"))
    sender_id = Column(Integer, ForeignKey("users.id"))
    amount = Column(Integer)
    status = Column(String) # "pending", "accepted", "rejected"
    created_at = Column(DateTime, default=datetime.now)