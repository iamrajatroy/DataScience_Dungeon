# ========================================
# DATA SCIENCE DUNGEON - QUESTION ROUTES
# ========================================

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
import random

from database import get_db
from models import User, Question, AnsweredQuestion
from schemas import QuestionResponse, AnswerQuestion, AnsweredQuestionResponse
from auth import get_current_user, get_current_user_optional

router = APIRouter()


@router.get("/random", response_model=QuestionResponse)
async def get_random_question(
    difficulty: str = Query(..., description="Question difficulty level"),
    exclude_ids: Optional[str] = Query(None, description="Comma-separated list of question IDs to exclude"),
    current_user: Optional[User] = Depends(get_current_user_optional),
    db: Session = Depends(get_db)
):
    """Get a random question by difficulty, excluding already answered questions"""
    
    # Build base query
    query = db.query(Question).filter(Question.difficulty == difficulty)
    
    # If user is authenticated, exclude questions they've already answered
    if current_user:
        answered_ids = db.query(AnsweredQuestion.question_id).filter(
            AnsweredQuestion.user_id == current_user.id
        ).subquery()
        query = query.filter(~Question.id.in_(answered_ids))
    
    # Exclude additional IDs if provided
    if exclude_ids:
        try:
            ids_to_exclude = [int(id.strip()) for id in exclude_ids.split(",") if id.strip()]
            if ids_to_exclude:
                query = query.filter(~Question.id.in_(ids_to_exclude))
        except ValueError:
            pass  # Ignore invalid IDs
    
    # Get all matching questions
    questions = query.all()
    
    if not questions:
        # Fallback: try any difficulty
        fallback_query = db.query(Question)
        if current_user:
            answered_ids = db.query(AnsweredQuestion.question_id).filter(
                AnsweredQuestion.user_id == current_user.id
            ).subquery()
            fallback_query = fallback_query.filter(~Question.id.in_(answered_ids))
        
        questions = fallback_query.all()
    
    if not questions:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No questions available"
        )
    
    # Return random question
    return random.choice(questions)


@router.get("/by-room-chest", response_model=QuestionResponse)
async def get_question_by_room_chest(
    room: int = Query(..., description="Room number (1-10)"),
    chest: int = Query(..., description="Chest number (1-3)"),
    current_user: Optional[User] = Depends(get_current_user_optional),
    db: Session = Depends(get_db)
):
    """Get a question appropriate for the given room and chest number"""
    
    # Determine difficulty based on room and chest
    if room <= 3:
        difficulties = ["easy", "medium", "hard"]
    elif room <= 6:
        difficulties = ["medium", "hard", "very_hard"]
    else:
        difficulties = ["hard", "very_hard", "expert"]
    
    difficulty = difficulties[min(chest - 1, 2)]
    
    # Build query
    query = db.query(Question).filter(Question.difficulty == difficulty)
    
    # Exclude answered questions for authenticated users
    if current_user:
        answered_ids = db.query(AnsweredQuestion.question_id).filter(
            AnsweredQuestion.user_id == current_user.id
        ).subquery()
        query = query.filter(~Question.id.in_(answered_ids))
    
    questions = query.all()
    
    if not questions:
        # Fallback to any difficulty
        fallback_query = db.query(Question)
        if current_user:
            answered_ids = db.query(AnsweredQuestion.question_id).filter(
                AnsweredQuestion.user_id == current_user.id
            ).subquery()
            fallback_query = fallback_query.filter(~Question.id.in_(answered_ids))
        questions = fallback_query.all()
    
    if not questions:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No questions available"
        )
    
    return random.choice(questions)


@router.post("/answered", response_model=AnsweredQuestionResponse)
async def record_answered_question(
    answer_data: AnswerQuestion,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Record that a user has answered a question"""
    
    # Check if question exists
    question = db.query(Question).filter(Question.id == answer_data.question_id).first()
    if not question:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Question not found"
        )
    
    # Check if already answered
    existing = db.query(AnsweredQuestion).filter(
        AnsweredQuestion.user_id == current_user.id,
        AnsweredQuestion.question_id == answer_data.question_id
    ).first()
    
    if existing:
        # Update existing record
        existing.answered_correctly = answer_data.answered_correctly
        if answer_data.room_number:
            existing.room_number = answer_data.room_number
        db.commit()
        db.refresh(existing)
        return existing
    
    # Create new record
    answered = AnsweredQuestion(
        user_id=current_user.id,
        question_id=answer_data.question_id,
        answered_correctly=answer_data.answered_correctly,
        room_number=answer_data.room_number
    )
    db.add(answered)
    db.commit()
    db.refresh(answered)
    
    return answered


@router.get("/answered", response_model=List[AnsweredQuestionResponse])
async def get_answered_questions(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all questions answered by the current user"""
    answered = db.query(AnsweredQuestion).filter(
        AnsweredQuestion.user_id == current_user.id
    ).all()
    return answered


@router.get("/stats")
async def get_question_stats(
    current_user: Optional[User] = Depends(get_current_user_optional),
    db: Session = Depends(get_db)
):
    """Get statistics about available questions"""
    total_questions = db.query(func.count(Question.id)).scalar()
    
    # Count by difficulty
    difficulties = {}
    for diff in ["easy", "medium", "hard", "very_hard", "expert"]:
        count = db.query(func.count(Question.id)).filter(Question.difficulty == diff).scalar()
        difficulties[diff] = count
    
    result = {
        "total_questions": total_questions,
        "by_difficulty": difficulties
    }
    
    if current_user:
        answered_count = db.query(func.count(AnsweredQuestion.id)).filter(
            AnsweredQuestion.user_id == current_user.id
        ).scalar()
        result["answered_by_user"] = answered_count
        result["remaining"] = total_questions - answered_count
    
    return result
