from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List

from database import get_db
from models.showtime import Showtime
from schemas.showtime import ShowtimeResponse, ShowtimeCreate
from utils.dependencies import get_admin_user

router = APIRouter(prefix="/showtimes", tags=["showtimes"])

@router.get("/movie/{movie_id}", response_model=List[ShowtimeResponse])
async def get_showtimes_by_movie(movie_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Showtime).where(Showtime.movie_id == movie_id))
    return result.scalars().all()

@router.get("/theater/{theater_id}", response_model=List[ShowtimeResponse])
async def get_showtimes_by_theater(theater_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Showtime).where(Showtime.theater_id == theater_id))
    return result.scalars().all()

@router.post("/", response_model=ShowtimeResponse, dependencies=[Depends(get_admin_user)])
async def create_showtime(showtime: ShowtimeCreate, db: AsyncSession = Depends(get_db)):
    db_showtime = Showtime(**showtime.model_dump())
    db.add(db_showtime)
    await db.commit()
    await db.refresh(db_showtime)
    return db_showtime
