import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from database import SessionLocal
from models.movie import Movie
from sqlalchemy import select

new_movies = [
    {
        "title": "Toxic",
        "description": "A fairy tale for grown-ups. The highly anticipated action thriller starring Rocking Star Yash.",
        "poster_url": "https://images.unsplash.com/photo-1534802046520-4f27db7f3ae5?w=600&q=80",
        "genre": "Action/Thriller",
        "rating": 9.5,
        "duration": 150,
        "release_date": "2025-04-10"
    },
    {
        "title": "Ramayana",
        "description": "The epic mythological tale of righteousness, dharma, and the ultimate victory of good over evil.",
        "poster_url": "https://images.unsplash.com/photo-1542157585-ef20fbcf0ce5?w=600&q=80",
        "genre": "Mythology/Epic",
        "rating": 9.8,
        "duration": 180,
        "release_date": "2025-10-24"
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
        print("2 new movies added successfully!")

if __name__ == "__main__":
    asyncio.run(add_movies())
