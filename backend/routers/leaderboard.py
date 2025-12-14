# ========================================
# DATA SCIENCE DUNGEON - LEADERBOARD ROUTER
# ========================================

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List
from pydantic import BaseModel

from database import get_db
from models import User, GameProgress


router = APIRouter()


class LeaderboardEntry(BaseModel):
    rank: int
    username: str
    score: int
    rooms_completed: int
    game_completed: bool

    class Config:
        from_attributes = True


@router.get("", response_model=List[LeaderboardEntry])
async def get_leaderboard(db: Session = Depends(get_db)):
    """
    Get top 10 players sorted by highest score.
    This endpoint is public - no authentication required.
    """
    # Query users with their game progress, sorted by score
    results = (
        db.query(User, GameProgress)
        .join(GameProgress, User.id == GameProgress.user_id)
        .order_by(desc(GameProgress.score))
        .limit(10)
        .all()
    )

    leaderboard = []
    for rank, (user, progress) in enumerate(results, start=1):
        leaderboard.append(
            LeaderboardEntry(
                rank=rank,
                username=user.username,
                score=progress.score,
                rooms_completed=progress.current_room - 1 if not progress.game_completed else 10,
                game_completed=progress.game_completed
            )
        )

    return leaderboard
