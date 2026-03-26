from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TheaterBase(BaseModel):
    name: str
    location: str
    capacity: Optional[int] = 0
    features: Optional[str] = None
    image_url: Optional[str] = None

class TheaterCreate(TheaterBase):
    pass

class TheaterResponse(TheaterBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
