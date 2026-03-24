import asyncio
import os
from sqlalchemy.ext.asyncio import create_async_engine
from database import DATABASE_URL

async def apply_migration():
    engine = create_async_engine(DATABASE_URL)
    
    print(f"Connecting to database to apply migration...")
    
    try:
        # Read the migration file
        migration_path = os.path.join(os.path.dirname(__file__), 'migrations', '001_create_users.sql')
        with open(migration_path, 'r') as f:
            sql = f.read()

        async with engine.begin() as conn:
            from sqlalchemy import text
            await conn.execute(text(sql))
            print("Migration applied successfully: users table created.")
            
    except Exception as e:
        print(f"Error applying migration: {e}")
    finally:
        await engine.dispose()

if __name__ == "__main__":
    asyncio.run(apply_migration())
