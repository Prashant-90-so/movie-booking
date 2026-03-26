from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from sqlalchemy.sql import func
from database import Base

class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    description = Column(Text)
    poster_url = Column(String)
    genre = Column(String)
    rating = Column(Float)
    duration = Column(Integer)  # In minutes
    release_date = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
