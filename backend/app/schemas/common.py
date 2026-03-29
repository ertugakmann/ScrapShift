from pydantic import BaseModel

class UserBrief(BaseModel):
    id: int
    name: str
    email: str
