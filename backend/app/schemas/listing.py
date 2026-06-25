from datetime import datetime
from pydantic import BaseModel
from app.schemas.user import UserResponse

class ListingCreate(BaseModel):
    title: str
    description: str
    price: int
    mileage: int
    year: int
    location_city: str
    image_url: str
    status: str

class ListingResponse(BaseModel):
    id: int
    title: str
    description: str
    price: int
    mileage: int
    year: int
    location_city: str
    image_url: str
    status: str
    created_at: datetime
    user: UserResponse

    class Config:
        from_attributes = True