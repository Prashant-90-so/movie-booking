import urllib.request
import re
from database import SessionLocal
from models.movie import Movie
from sqlalchemy import update
import asyncio

req = urllib.request.Request('https://html.duckduckgo.com/html/?q=Toxic+Yash+movie+poster+2025', headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    match = re.search(r'src="(//external-content\.duckduckgo\.com/[^"]+)"', html)
    if match:
        img_url = "https:" + match.group(1).replace('&amp;', '&')
        print("Found URL:", img_url)
        # update DB
        async def main():
            async with SessionLocal() as session:
                await session.execute(update(Movie).where(Movie.title == "Toxic").values(poster_url=img_url))
                await session.commit()
                print("Database updated!")
        asyncio.run(main())
    else:
        print("No image found")
except Exception as e:
    print(e)
