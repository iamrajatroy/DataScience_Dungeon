# ========================================
# DATA SCIENCE DUNGEON - PROGRESS ROUTES
# ========================================

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import json

from database import get_db
from models import User, GameProgress, AnsweredQuestion
from schemas import GameProgressCreate, GameProgressUpdate, GameProgressResponse
from auth import get_current_user

router = APIRouter()


@router.get("", response_model=GameProgressResponse)
async def get_progress(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get current user's game progress"""
    progress = db.query(GameProgress).filter(GameProgress.user_id == current_user.id).first()
    
    if not progress:
        # Create new progress if doesn't exist
        progress = GameProgress(user_id=current_user.id)
        db.add(progress)
        db.commit()
        db.refresh(progress)
    
    return progress


@router.post("", response_model=GameProgressResponse)
async def create_progress(
    progress_data: GameProgressCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create or reset game progress (start new game)"""
    # Delete existing progress
    existing = db.query(GameProgress).filter(GameProgress.user_id == current_user.id).first()
    if existing:
        db.delete(existing)
        db.commit()
    
    # Clear answered questions for new game
    db.query(AnsweredQuestion).filter(AnsweredQuestion.user_id == current_user.id).delete()
    db.commit()
    
    # Create new progress
    chest_states_json = json.dumps(progress_data.chest_states) if progress_data.chest_states else "{}"
    
    new_progress = GameProgress(
        user_id=current_user.id,
        current_room=progress_data.current_room,
        brightness_level=progress_data.brightness_level,
        total_correct=progress_data.total_correct,
        total_incorrect=progress_data.total_incorrect,
        score=progress_data.score,
        game_completed=progress_data.game_completed,
        chest_states=chest_states_json
    )
    db.add(new_progress)
    db.commit()
    db.refresh(new_progress)
    
    return new_progress


@router.put("", response_model=GameProgressResponse)
async def update_progress(
    progress_data: GameProgressUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update game progress"""
    progress = db.query(GameProgress).filter(GameProgress.user_id == current_user.id).first()
    
    # Create if not exists (Upsert)
    if not progress:
        progress = GameProgress(user_id=current_user.id)
        db.add(progress)
    
    # Update fields if provided
    if progress_data.current_room is not None:
        progress.current_room = progress_data.current_room
    if progress_data.brightness_level is not None:
        progress.brightness_level = progress_data.brightness_level
    if progress_data.total_correct is not None:
        progress.total_correct = progress_data.total_correct
    if progress_data.total_incorrect is not None:
        progress.total_incorrect = progress_data.total_incorrect
    if progress_data.score is not None:
        progress.score = progress_data.score
    if progress_data.game_completed is not None:
        progress.game_completed = progress_data.game_completed
    if progress_data.chest_states is not None:
        progress.chest_states = json.dumps(progress_data.chest_states)
    
    db.commit()
    db.refresh(progress)
    
    return progress


@router.delete("")
async def delete_progress(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete game progress (reset game)"""
    progress = db.query(GameProgress).filter(GameProgress.user_id == current_user.id).first()
    
    if progress:
        db.delete(progress)
    
    # Clear answered questions
    db.query(AnsweredQuestion).filter(AnsweredQuestion.user_id == current_user.id).delete()
    db.commit()
    
    return {"message": "Progress reset successfully"}
