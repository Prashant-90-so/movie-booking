from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from typing import List, Optional

from database import get_db
from models.movie import Movie
from schemas.movie import MovieCreate, MovieResponse
from utils.dependencies import get_admin_user

router = APIRouter(prefix="/movies", tags=["movies"])

@router.get("/", response_model=List[MovieResponse])
async def get_movies(q: Optional[str] = None, genre: Optional[str] = None, db: AsyncSession = Depends(get_db)):
    query = select(Movie)
    if q:
        query = query.where(or_(Movie.title.ilike(f"%{q}%"), Movie.description.ilike(f"%{q}%")))
    if genre:
        query = query.where(Movie.genre.ilike(f"%{genre}%"))
        
    result = await db.execute(query)
    return result.scalars().all()

@router.get("/{movie_id}", response_model=MovieResponse)
async def get_movie(movie_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Movie).where(Movie.id == movie_id))
    movie = result.scalars().first()
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie

# For internal seeding or admin use
@router.post("/", response_model=MovieResponse, dependencies=[Depends(get_admin_user)])
async def create_movie(movie: MovieCreate, db: AsyncSession = Depends(get_db)):
    new_movie = Movie(**movie.dict())
    db.add(new_movie)
    await db.commit()
    await db.refresh(new_movie)
    return new_movie
