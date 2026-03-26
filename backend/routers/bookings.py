from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import List

from database import get_db
from models.booking import Booking
from models.showtime import Showtime
from models.user import User
from schemas.booking import BookingResponse, BookingCreate
from utils.dependencies import get_current_user

router = APIRouter(prefix="/bookings", tags=["bookings"])

@router.get("/me", response_model=List[BookingResponse])
async def get_my_bookings(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Booking).where(Booking.user_id == current_user.id))
    return result.scalars().all()

@router.post("/", response_model=BookingResponse)
async def create_booking(booking: BookingCreate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Verify showtime exists
    showtime_res = await db.execute(select(Showtime).where(Showtime.id == booking.showtime_id))
    showtime = showtime_res.scalars().first()
    if not showtime:
        raise HTTPException(status_code=404, detail="Showtime not found")

    new_booking = Booking(
        user_id=current_user.id,
        showtime_id=booking.showtime_id,
        seats=booking.seats,
        total_price=booking.total_price
    )
    db.add(new_booking)
    await db.commit()
    await db.refresh(new_booking)
    return new_booking
