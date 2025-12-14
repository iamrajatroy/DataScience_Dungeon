# ========================================
# DATA SCIENCE DUNGEON - FASTAPI APPLICATION
# ========================================

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

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
    # Allow all origins (since we use Token headers, not cookies)
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


@app.get("/")
async def root():
    """Root endpoint - API health check"""
    return {
        "message": "Welcome to Data Science Dungeon API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
