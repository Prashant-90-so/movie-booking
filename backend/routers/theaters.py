from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List

from database import get_db
from models.theater import Theater
from schemas.theater import TheaterCreate, TheaterResponse
from utils.dependencies import get_admin_user

router = APIRouter(prefix="/theaters", tags=["theaters"])

@router.get("/", response_model=List[TheaterResponse])
async def get_theaters(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Theater))
    return result.scalars().all()

@router.get("/{theater_id}", response_model=TheaterResponse)
async def get_theater(theater_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Theater).where(Theater.id == theater_id))
    theater = result.scalars().first()
    if not theater:
        raise HTTPException(status_code=404, detail="Theater not found")
    return theater

# For internal seeding or admin use
@router.post("/", response_model=TheaterResponse, dependencies=[Depends(get_admin_user)])
async def create_theater(theater: TheaterCreate, db: AsyncSession = Depends(get_db)):
    new_theater = Theater(**theater.dict())
    db.add(new_theater)
    await db.commit()
    await db.refresh(new_theater)
    return new_theater
