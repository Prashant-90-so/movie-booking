import urllib.request
import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from database import SessionLocal
from models.movie import Movie
from sqlalchemy import update

urls = [
    'https://stat5.bollywoodhungama.in/wp-content/uploads/2023/12/Toxic.jpg',
    'https://static.toiimg.com/thumb/msid-105828459,width-1280,height-720,resizemode-4/105828459.jpg',
    'https://images.indianexpress.com/2023/12/yash-toxic-1600.jpg',
    'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=600&q=80' # fallback
]

async def main():
    local_path = r'C:\Users\STUDENT\Desktop\movie booking\frontend\public\images\toxic.jpg'
    success = False
    
    for url in urls:
        print("Trying", url)
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        try:
            with urllib.request.urlopen(req) as response, open(local_path, 'wb') as out_file:
                out_file.write(response.read())
            print("Downloaded successfully!")
            success = True
            break
        except Exception as e:
            print("Failed:", e)

    if success:
        async with SessionLocal() as session:
            await session.execute(
                update(Movie)
                .where(Movie.title == "Toxic")
                .values(poster_url="/images/toxic.jpg")
            )
            await session.commit()
            print("Database updated!")

if __name__ == "__main__":
    asyncio.run(main())
