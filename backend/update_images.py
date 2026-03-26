import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from database import SessionLocal
from models.movie import Movie
from sqlalchemy import update

async def update_toxic():
    async with SessionLocal() as session:
        await session.execute(
            update(Movie)
            .where(Movie.title == "Toxic")
            .values(poster_url="https://images.indianexpress.com/2023/12/yash-toxic-1600.jpg")
        )
        await session.commit()
        print("Toxic image updated!")
    await asyncio.sleep(0.5)

if __name__ == "__main__":
    asyncio.run(update_toxic())
