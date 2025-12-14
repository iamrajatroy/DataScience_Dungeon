# ========================================
# DATA SCIENCE DUNGEON - PYDANTIC SCHEMAS
# ========================================

from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any
from datetime import datetime


# ==================== USER SCHEMAS ====================

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    created_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    user_id: Optional[int] = None


# ==================== GAME PROGRESS SCHEMAS ====================

class GameProgressCreate(BaseModel):
    current_room: int = 1
    brightness_level: int = 100
    total_correct: int = 0
    total_incorrect: int = 0
    score: int = 0
    game_completed: bool = False
    chest_states: Optional[Any] = []


class GameProgressUpdate(BaseModel):
    current_room: Optional[int] = None
    brightness_level: Optional[int] = None
    total_correct: Optional[int] = None
    total_incorrect: Optional[int] = None
    score: Optional[int] = None
    game_completed: Optional[bool] = None
    chest_states: Optional[Any] = None


class GameProgressResponse(BaseModel):
    id: int
    user_id: int
    current_room: int
    brightness_level: int
    total_correct: int
    total_incorrect: int
    score: int
    game_completed: bool
    chest_states: str
    last_saved: datetime

    class Config:
        from_attributes = True


# ==================== QUESTION SCHEMAS ====================

class QuestionResponse(BaseModel):
    id: int
    question_text: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    correct_answer: str
    difficulty: str
    topic: str
    explanation: Optional[str] = None

    class Config:
        from_attributes = True


class AnswerQuestion(BaseModel):
    question_id: int
    answered_correctly: bool
    room_number: Optional[int] = None


class AnsweredQuestionResponse(BaseModel):
    id: int
    question_id: int
    answered_correctly: bool
    answered_at: datetime
    room_number: Optional[int] = None

    class Config:
        from_attributes = True
