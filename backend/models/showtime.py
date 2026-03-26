from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Showtime(Base):
    __tablename__ = "showtimes"

    id = Column(Integer, primary_key=True, index=True)
    movie_id = Column(Integer, ForeignKey("movies.id"), nullable=False, index=True)
    theater_id = Column(Integer, ForeignKey("theaters.id"), nullable=False, index=True)
    start_time = Column(DateTime(timezone=True), nullable=False)
    ticket_price = Column(Float, nullable=False)
