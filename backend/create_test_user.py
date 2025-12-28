"""
Script to create a test user at room 10 for testing victory screen
Run: python create_test_user.py
"""

import os
import sys
sys.path.insert(0, os.path.dirname(__file__))

from database import SessionLocal, engine, Base
from models import User, GameProgress
from passlib.context import CryptContext
import json

# Create tables
Base.metadata.create_all(bind=engine)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_test_user():
    db = SessionLocal()
    try:
        # Check if test user exists
        test_email = "test@dungeon.com"
        existing = db.query(User).filter(User.email == test_email).first()
        
        if existing:
            print(f"Test user already exists: {test_email}")
            # Update progress to room 10
            progress = db.query(GameProgress).filter(GameProgress.user_id == existing.id).first()
            if not progress:
                progress = GameProgress(user_id=existing.id)
                db.add(progress)
            
            # Set to room 10 with all chests opened
            progress.current_room = 10
            progress.brightness_level = 80  # Some health remaining
            progress.score = 5000
            progress.total_correct = 28
            progress.total_incorrect = 2
            # All chests for rooms 1-9 opened, room 10 has 3 chests opened
            chests = []
            for room in range(1, 11):
                for chest in range(1, 4):
                    chests.append({"room": room, "chest": chest})
            progress.chest_states = json.dumps(chests)
            progress.game_completed = False
            
            db.commit()
            print(f"Updated progress to room 10 for test user")
        else:
            # Create test user
            hashed_password = pwd_context.hash("test123")
            user = User(
                username="TestHero",
                email=test_email,
                password_hash=hashed_password
            )
            db.add(user)
            db.commit()
            db.refresh(user)
            
            # Create progress at room 10
            chests = []
            for room in range(1, 11):
                for chest in range(1, 4):
                    chests.append({"room": room, "chest": chest})
            
            progress = GameProgress(
                user_id=user.id,
                current_room=10,
                brightness_level=80,
                score=5000,
                total_correct=28,
                total_incorrect=2,
                chest_states=json.dumps(chests),
                game_completed=False
            )
            db.add(progress)
            db.commit()
            
            print(f"Created test user:")
            print(f"  Email: {test_email}")
            print(f"  Password: test123")
            print(f"  Room: 10 (ready to enter victory portal)")
        
    finally:
        db.close()

if __name__ == "__main__":
    create_test_user()
