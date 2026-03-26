from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    showtime_id = Column(Integer, ForeignKey("showtimes.id"), nullable=False, index=True)
    seats = Column(String, nullable=False) # e.g. "A1,A2"
    total_price = Column(Float, nullable=False)
    status = Column(String, default="Confirmed")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
