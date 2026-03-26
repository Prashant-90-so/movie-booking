from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from .showtime import ShowtimeResponse
from .user import UserResponse

class BookingBase(BaseModel):
    showtime_id: int
    seats: str
    total_price: float

class BookingCreate(BookingBase):
    pass

class BookingResponse(BookingBase):
    id: int
    user_id: int
    status: str
    created_at: datetime
    showtime: Optional[ShowtimeResponse] = None

    class Config:
        from_attributes = True
