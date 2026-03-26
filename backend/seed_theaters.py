import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from database import SessionLocal, engine, Base
from models.theater import Theater
from sqlalchemy import select

theaters_data = [
    {
        "name": "Karnataka Cinematic IMAX",
        "location": "Bengaluru City Center",
        "capacity": 500,
        "features": "IMAX, Dolby Atmos, Recliner Seats",
        "image_url": "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&q=80"
    },
    {
        "name": "Starlight Drive-In",
        "location": "Mysuru Highway",
        "capacity": 200,
        "features": "Drive-In, 4K Projection, Outdoor Dining",
        "image_url": "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=800&q=80"
    },
    {
        "name": "The Royal Premiere",
        "location": "Mangaluru Coastal Mall",
        "capacity": 300,
        "features": "4DX, VIP Lounge, Laser Projection",
        "image_url": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80"
    }
]

async def seed_theaters():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        print("Database tables verified.")

    async with SessionLocal() as session:
        result = await session.execute(select(Theater))
        existing_theaters = result.scalars().all()
        
        if not existing_theaters:
            for t in theaters_data:
                theater = Theater(**t)
                session.add(theater)
            await session.commit()
            print("Theaters seeded successfully!")
        else:
            print("Theaters already exist in the database.")

if __name__ == "__main__":
    asyncio.run(seed_theaters())
