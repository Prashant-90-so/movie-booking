import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

load_dotenv()

# We might receive a synchronous URL (postgresql://) or async (postgresql+asyncpg://)
# If it's a synchronous url, convert it to asyncpg for async sqlalchemy
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://neondb_owner:nZ2G8QvpyOah@ep-summer-silence-44417958.us-east-2.aws.neon.tech/neondb?ssl=require")

if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+asyncpg://", 1)
elif DATABASE_URL.startswith("postgresql://") and "asyncpg" not in DATABASE_URL:
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

engine = create_async_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

Base = declarative_base()

async def get_db():
    async with SessionLocal() as session:
        yield session
