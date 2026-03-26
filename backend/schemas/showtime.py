from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ShowtimeBase(BaseModel):
    movie_id: int
    theater_id: int
    start_time: datetime
    ticket_price: float

class ShowtimeCreate(ShowtimeBase):
    pass

class ShowtimeResponse(ShowtimeBase):
    id: int

    class Config:
        from_attributes = True
