from pydantic import BaseModel

class UserBrief(BaseModel):
    id: int
    username: str
    email: str

class ListingBrief(BaseModel):
    id: int
    title: str
    description: str
    price: float
    image_url: str