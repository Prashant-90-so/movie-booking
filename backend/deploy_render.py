import requests
import json

RENDER_TOKEN = "rnd_vJrM7msmuGKqNfxz3vm6dEqJl9RT"

url = "https://api.render.com/v1/services"

payload = {
    "type": "web_service",
    "name": "movie-booking-backend",
    "ownerId": "",  # Automatically resolves to the user's personal context if omitted in some cases, or we can fetch it. Let's try without it or empty. Wait, ownerId is required for Render.
    "repo": "https://github.com/Prashant-90-so/movie-booking",
    "autoDeploy": "yes",
    "branch": "main",
    "envVars": [
        {"key": "DATABASE_URL", "value": "postgresql+asyncpg://neondb_owner:nZ2G8QvpyOah@ep-summer-silence-44417958.us-east-2.aws.neon.tech/neondb?ssl=require"},
        {"key": "SECRET_KEY", "generateValue": "true"},
        {"key": "ALGORITHM", "value": "HS256"},
        {"key": "ACCESS_TOKEN_EXPIRE_MINUTES", "value": "30"}
    ],
    "envSpecificDetails": {
        "buildCommand": "pip install -r backend/requirements.txt",
        "startCommand": "cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT"
    }
}

headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "authorization": f"Bearer {RENDER_TOKEN}"
}

# we need owner id first
owner_response = requests.get("https://api.render.com/v1/owners", headers=headers)
if owner_response.status_code == 200:
    payload["ownerId"] = owner_response.json()[0]["owner"]["id"]
    response = requests.post(url, json=payload, headers=headers)
    print("Render Response:", response.status_code)
    print(response.text)
else:
    print("Failed to get owner ID:", owner_response.text)
