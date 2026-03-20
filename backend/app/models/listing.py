from datetime import datetime
from app.db import Base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey

class Listing(Base):
    __tablename__ = "listings"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    price = Column(Integer, index=True)
    mileage = Column(Integer, index=True)
    year = Column(Integer, index=True)
    location_city = Column(String, index=True)
    image_url = Column(String, index=True)
    status = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now)

    user_id = Column(Integer, ForeignKey("users.id"))