from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from database import Base

class Theater(Base):
    __tablename__ = "theaters"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    location = Column(String, nullable=False)
    capacity = Column(Integer)
    features = Column(String) # Comma-separated features like "IMAX, Dolby Atmos, 4DX"
    image_url = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
