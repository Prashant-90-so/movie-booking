import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from database import SessionLocal, engine, Base
from models.movie import Movie
from models.user import User  # Ensure User is also imported so it gets created
from sqlalchemy import select

movies_data = [
    {
        "title": "The Great Empire",
        "description": "An epic historical drama following the rise and fall of a legendary Roman legion.",
        "poster_url": "/images/the_great_empire.png",
        "genre": "Drama/History",
        "rating": 8.5,
        "duration": 145,
        "release_date": "2024-05-15"
    },
    {
        "title": "Neon Dreams",
        "description": "In a rain-soaked cyberpunk future, a lone detective uncovers a conspiracy that threatens to rewrite reality.",
        "poster_url": "/images/neon_dreams.png",
        "genre": "Sci-Fi/Action",
        "rating": 7.9,
        "duration": 128,
        "release_date": "2024-08-22"
    },
    {
        "title": "Silent Forest",
        "description": "A psychological thriller where a weekend getaway becomes a desperate fight for survival in a mysterious forest.",
        "poster_url": "/images/silent_forest.png",
        "genre": "Thriller/Mystery",
        "rating": 7.4,
        "duration": 110,
        "release_date": "2024-10-31"
    },
    {
        "title": "Space Odyssey: Beyond",
        "description": "The crew of the Odyssey faces the ultimate challenge as they venture beyond the known reaches of the universe.",
        "poster_url": "/images/space_odyssey.png",
        "genre": "Sci-Fi/Adventure",
        "rating": 9.1,
        "duration": 162,
        "release_date": "2024-12-25"
    }
]

async def seed_movies():
    # Create tables if they don't exist
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        print("Database tables verified/created.")

    async with SessionLocal() as session:
        # Check if movies already exist
        result = await session.execute(select(Movie))
        existing_movies = result.scalars().all()
        
        if not existing_movies:
            for m in movies_data:
                movie = Movie(**m)
                session.add(movie)
            await session.commit()
            print("Movies seeded successfully!")
        else:
            print("Movies already exist in the database.")

if __name__ == "__main__":
    asyncio.run(seed_movies())
