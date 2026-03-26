import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
from passlib.context import CryptContext
import sys
import os

# Add backend directory to path so we can import database URL
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend')))
from database import DATABASE_URL

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def seed_users():
    engine = create_async_engine(DATABASE_URL)
    
    users_to_insert = [
        {"name": "Admin User", "email": "admin@example.com", "password": "adminpassword"},
        {"name": "Test User 1", "email": "user1@example.com", "password": "password123"},
        {"name": "Test User 2", "email": "user2@example.com", "password": "password123"}
    ]
    
    print(f"Connecting to database to seed users...")
    
    try:
        async with engine.begin() as conn:
            for user in users_to_insert:
                hashed_pw = pwd_context.hash(user["password"])
                
                # Check if user already exists
                result = await conn.execute(
                    text("SELECT id FROM users WHERE email = :email"),
                    {"email": user["email"]}
                )
                
                if result.fetchone() is None:
                    await conn.execute(
                        text("INSERT INTO users (name, email, password_hash) VALUES (:name, :email, :password_hash)"),
                        {"name": user["name"], "email": user["email"], "password_hash": hashed_pw}
                    )
                    print(f"Inserted user: {user['email']}")
                else:
                    print(f"User already exists: {user['email']}")
                    
            print("Database seeding completed.")
            
    except Exception as e:
        print(f"Error seeding database: {e}")
    finally:
        await engine.dispose()

if __name__ == "__main__":
    asyncio.run(seed_users())
