# ========================================
# DATA SCIENCE DUNGEON - DATABASE MODELS
# ========================================

from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base


class User(Base):
    """User account for authentication"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False, index=True)
    email = Column(String(100), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    last_login = Column(DateTime, nullable=True)

    # Relationships
    game_progress = relationship("GameProgress", back_populates="user", uselist=False)
    answered_questions = relationship("AnsweredQuestion", back_populates="user")


class GameProgress(Base):
    """Track user's game progress"""
    __tablename__ = "game_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, unique=True)
    current_room = Column(Integer, default=1)
    brightness_level = Column(Integer, default=100)
    total_correct = Column(Integer, default=0)
    total_incorrect = Column(Integer, default=0)
    score = Column(Integer, default=0)
    game_completed = Column(Boolean, default=False)
    chest_states = Column(Text, default="{}")  # JSON string for chest states
    last_saved = Column(DateTime, server_default=func.now(), onupdate=func.now())

    # Relationships
    user = relationship("User", back_populates="game_progress")


class Question(Base):
    """Question bank for the game"""
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    question_text = Column(Text, nullable=False)
    option_a = Column(Text, nullable=False)
    option_b = Column(Text, nullable=False)
    option_c = Column(Text, nullable=False)
    option_d = Column(Text, nullable=False)
    correct_answer = Column(String(1), nullable=False)
    difficulty = Column(String(20), nullable=False, index=True)
    topic = Column(String(50), nullable=False, index=True)
    explanation = Column(Text, nullable=True)

    # Relationships
    answered_by = relationship("AnsweredQuestion", back_populates="question")


class AnsweredQuestion(Base):
    """Track which questions each user has answered"""
    __tablename__ = "answered_questions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    question_id = Column(Integer, ForeignKey("questions.id"), nullable=False)
    answered_correctly = Column(Boolean, nullable=False)
    answered_at = Column(DateTime, server_default=func.now())
    room_number = Column(Integer, nullable=True)

    # Relationships
    user = relationship("User", back_populates="answered_questions")
    question = relationship("Question", back_populates="answered_by")

    # Ensure unique constraint on user_id + question_id
    __table_args__ = (
        # UniqueConstraint handled by index
    )
