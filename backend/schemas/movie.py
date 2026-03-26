from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class MovieBase(BaseModel):
    title: str
    description: Optional[str] = None
    poster_url: Optional[str] = None
    genre: Optional[str] = None
    rating: Optional[float] = 0.0
    duration: Optional[int] = 0  # In minutes
    release_date: Optional[str] = None

class MovieCreate(MovieBase):
    pass

class MovieResponse(MovieBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
