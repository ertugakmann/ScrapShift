from datetime import datetime
from pydantic import BaseModel

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

    class Config:
        from_attributes = True