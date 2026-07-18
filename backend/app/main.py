import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environmental variables from .env
load_dotenv()

from .routes import boardroom

app = FastAPI(
    title="BoardPilot AI Swarm Backend",
    description="Multi-agent boardroom consultation backend using OpenAI Swarm.",
    version="1.0.0"
)

# Enable CORS for Next.js frontend calls
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production to match your frontend domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes under /api
app.include_router(boardroom.router, prefix="/api", tags=["Boardroom"])

@app.get("/")
async def root():
    return {
        "status": "online",
        "service": "BoardPilot Swarm API Engine",
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "8000"))
    host = os.getenv("HOST", "0.0.0.0")
    uvicorn.run("main:app", host=host, port=port, reload=True)
