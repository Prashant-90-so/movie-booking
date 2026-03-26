import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from database import SessionLocal
from models.movie import Movie
from sqlalchemy import update

async def main():
    async with SessionLocal() as session:
        await session.execute(update(Movie).where(Movie.title == "Toxic").values(poster_url="/images/toxic.jpg"))
        await session.commit()
        print("Done!")

if __name__ == "__main__":
    asyncio.run(main())
