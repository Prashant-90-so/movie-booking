import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from database import SessionLocal
from models.theater import Theater
from sqlalchemy import select

new_theaters = [
    {
        "name": "Hubballi Cinepolis Prime",
        "location": "Hubballi Urban Oasis Mall",
        "capacity": 450,
        "features": "4K, Recliner Seats, Dolby Digital",
        "image_url": "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&q=80"
    },
    {
        "name": "Belagavi INOX Premium",
        "location": "Belagavi Central",
        "capacity": 350,
        "features": "IMAX, Dolby Atmos, VIP Service",
        "image_url": "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&q=80"
    },
    {
        "name": "Mysuru Heritage Cinemas",
        "location": "Palace Road, Mysuru",
        "capacity": 500,
        "features": "Laser Projection, Heritage Styling",
        "image_url": "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&q=80"
    },
    {
        "name": "Coastal Breeze Multiplex",
        "location": "Mangaluru Beach Road",
        "capacity": 250,
        "features": "4DX, Ocean View Lounge",
        "image_url": "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=600&q=80"
    },
    {
        "name": "Orion Mall PVR Luxury",
        "location": "Bengaluru Rajajinagar",
        "capacity": 200,
        "features": "Director's Cut, Luxury Dining",
        "image_url": "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=600&q=80"
    },
    {
        "name": "Udupi Silver Screens",
        "location": "Udupi City Square",
        "capacity": 300,
        "features": "2D/3D, Family Enclosures",
        "image_url": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80"
    }
]

async def add_theaters():
    async with SessionLocal() as session:
        for t in new_theaters:
            # check if exists
            result = await session.execute(select(Theater).where(Theater.name == t["name"]))
            if not result.scalars().first():
                theater = Theater(**t)
                session.add(theater)
        await session.commit()
        print("6 new theaters added successfully!")

if __name__ == "__main__":
    asyncio.run(add_theaters())
