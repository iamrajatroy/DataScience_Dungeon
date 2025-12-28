# ========================================
# DATA SCIENCE DUNGEON - FASTAPI APPLICATION
# ========================================

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from contextlib import asynccontextmanager
import os

from database import engine, Base
from routers import users, progress, questions, leaderboard


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan - create tables on startup"""
    Base.metadata.create_all(bind=engine)
    yield


# Create FastAPI application
app = FastAPI(
    title="Data Science Dungeon API",
    description="Backend API for the Data Science Dungeon educational game",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    # Allow all origins
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(progress.router, prefix="/api/progress", tags=["Game Progress"])
app.include_router(questions.router, prefix="/api/questions", tags=["Questions"])
app.include_router(leaderboard.router, prefix="/api/leaderboard", tags=["Leaderboard"])

# Serve Static Files
# Resolve paths relative to this file to work in both local and docker envs
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Project root is one level up from backend/
ROOT_DIR = os.path.dirname(BASE_DIR)

# Mount directories
app.mount("/js", StaticFiles(directory=os.path.join(ROOT_DIR, "js")), name="js")
app.mount("/assets", StaticFiles(directory=os.path.join(ROOT_DIR, "assets")), name="assets")

@app.get("/")
async def serve_index():
    return FileResponse(os.path.join(ROOT_DIR, "index.html"))

@app.get("/styles.css")
async def serve_css():
    return FileResponse(os.path.join(ROOT_DIR, "styles.css"))

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    # When running directly, we need to ensure we're finding the backend module
    uvicorn.run(app, host="0.0.0.0", port=8080)
