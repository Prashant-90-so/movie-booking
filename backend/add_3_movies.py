import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from database import SessionLocal
from models.movie import Movie
from sqlalchemy import select

new_movies = [
    {
        "title": "Velocity Drift",
        "description": "High octane street racing and undercover operations collide in this thrilling action blockbuster.",
        "poster_url": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=600&q=80",
        "genre": "Action/Thriller",
        "rating": 8.2,
        "duration": 135,
        "release_date": "2025-02-14"
    },
    {
        "title": "The Wishing Tree",
        "description": "A heartwarming animated tale of a magical tree that grants the deepest desires of pure hearts.",
        "poster_url": "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&q=80",
        "genre": "Animation/Family",
        "rating": 8.8,
        "duration": 95,
        "release_date": "2025-05-01"
    },
    {
        "title": "Crimson Shadows",
        "description": "A chilling horror story about an abandoned mansion with a dark, bloody history that shouldn't be disturbed.",
        "poster_url": "https://images.unsplash.com/photo-1505635552518-3448ff116af3?w=600&q=80",
        "genre": "Horror",
        "rating": 7.1,
        "duration": 105,
        "release_date": "2024-10-18"
    }
]

async def add_movies():
    async with SessionLocal() as session:
        for m in new_movies:
            # check if exists
            result = await session.execute(select(Movie).where(Movie.title == m["title"]))
            if not result.scalars().first():
                movie = Movie(**m)
                session.add(movie)
        await session.commit()
        print("3 new movies added successfully!")

if __name__ == "__main__":
    asyncio.run(add_movies())
