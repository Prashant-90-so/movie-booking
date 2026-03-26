import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, movies, theaters, showtimes, bookings, users

app = FastAPI(title="Karnataka Booking API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(movies.router)
app.include_router(theaters.router)
app.include_router(showtimes.router)
app.include_router(bookings.router)
app.include_router(users.router)

@app.get("/")
def read_root():
    return {"message": "Karnataka Booking API is running!"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
