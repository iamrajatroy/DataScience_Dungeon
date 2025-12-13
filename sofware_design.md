# Software Specification Document
## Data Science Dungeon - Browser-Based 8-Bit Quiz Game

**Version:** 1.0  
**Date:** December 11, 2025  
**Document Owner:** Development Team

---

## 1. Executive Summary

Data Science Dungeon is a browser-based, 8-bit style educational game that combines dungeon exploration mechanics with data science knowledge assessment. Players control a hero character navigating through a series of rooms, answering progressively difficult data science questions to advance through levels.

---

## 2. Project Overview

### 2.1 Purpose
To create an engaging, gamified learning platform that tests and reinforces data science knowledge across multiple domains while providing an entertaining retro gaming experience.

### 2.2 Scope
A web-based application featuring:
- 8-bit pixel art game environment
- Question-based progression system
- Multi-room dungeon navigation
- Persistent user progress tracking
- Dynamic question retrieval system

---

## 3. Functional Requirements

### 3.1 Game Mechanics

#### 3.1.1 Character Control
- **Movement System**
  - Player controls hero character using keyboard arrow keys (↑ ↓ ← →)
  - Character must be able to traverse freely within room boundaries
  - Collision detection with walls, chests, and room boundaries
  - Smooth, responsive movement appropriate for 8-bit aesthetics

#### 3.1.2 Room Structure
- **Environment Design**
  - Each room represents one level in the dungeon
  - 10 total rooms required to complete the game
  - Each room contains exactly 3 treasure chests
  - Chests positioned strategically within the room space

#### 3.1.3 Chest Interaction
- **Interaction Mechanism**
  - Space bar key used to open/close chests
  - Interaction only available when hero is within proximity of chest
  - Visual indicator when hero is near enough to interact
  - Chest state changes visually when opened

#### 3.1.4 Question System
- **Question Presentation**
  - Question displayed when chest is opened
  - User must answer before continuing
  - Three questions per room (one per chest)
  - Progressive difficulty: Easy → Medium → Hard within each room

#### 3.1.5 Difficulty Progression
- **Per-Room Scaling**
  - Chest 1: Easy difficulty
  - Chest 2: Medium difficulty
  - Chest 3: Hard difficulty
- **Cross-Room Scaling**
  - Overall difficulty increases as player progresses through rooms 1-10

#### 3.1.6 Penalty System
- **Brightness Reduction**
  - Screen brightness decreases by 20% for each incorrect answer
  - Maximum 5 incorrect answers allowed (100% → 80% → 60% → 40% → 20% → 0%)
  - Visual feedback showing brightness reduction effect
  - Game ends (Game Over) when brightness reaches 0%

#### 3.1.7 Progression System
- **Advancement Criteria**
  - Player must answer all 3 questions in a room to proceed
  - Upon completing room (3 correct answers), door/portal to next room unlocks
  - Progress saved after each completed room

### 3.2 Question Management

#### 3.2.1 Topic Coverage
Questions must cover the following data science domains:
- **Statistics** (descriptive, inferential, probability)
- **Machine Learning (ML)** (supervised, unsupervised, algorithms)
- **Deep Learning (DL)** (neural networks, architectures, optimization)
- **Reinforcement Learning (RL)** (agents, rewards, policies)
- **Natural Language Processing (NLP)** (tokenization, embeddings, models)
- **Large Language Models (LLMs)** (transformers, fine-tuning, prompting)
- **Generative AI (GenAI)** (GANs, diffusion models, applications)

#### 3.2.2 Question Retrieval
- **API Integration**
  - Questions fetched from external API endpoint
  - API must provide questions with difficulty levels
  - API must categorize questions by topic
  - Fallback mechanism if API unavailable

#### 3.2.3 Question Uniqueness
- **Non-Repetition Logic**
  - Questions should not repeat during gameplay session
  - Questions should not repeat across multiple gameplay sessions for same user
  - Track answered questions in database
  - Intelligent question pool management

### 3.3 User Progress Management

#### 3.3.1 Progress Tracking
- Current room number
- Questions answered correctly
- Questions answered incorrectly
- Current brightness level
- Timestamp of last play
- Completion status per room

#### 3.3.2 Save/Load System
- Auto-save after each room completion
- Manual save option
- Load saved game on return
- Multiple save slots (optional enhancement)

### 3.4 Visual Design Requirements

#### 3.4.1 Art Style
- Authentic 8-bit pixel art aesthetic
- Limited color palette consistent with retro games
- Sprite-based character and object rendering
- Tile-based room construction

#### 3.4.2 UI Elements
- Health/brightness indicator
- Room number display
- Question dialog box
- Answer input interface
- Progress indicator

#### 3.4.3 Asset Management
- All game assets stored in `/assets` folder
- Organized subfolders:
  - `/assets/sprites` - Character and object sprites
  - `/assets/tiles` - Room tiles and backgrounds
  - `/assets/ui` - UI elements and fonts
  - `/assets/audio` - Sound effects and music (if applicable)

---

## 4. Technical Specifications

### 4.1 Technology Stack

#### 4.1.1 Frontend
- **Framework:** Phaser 3 (recommended for 2D game development)
  - Alternative: Pixi.JS + React for more control
  - Alternative: HTML5 Canvas + Vanilla JavaScript for lightweight approach
- **Rendering:** HTML5 Canvas
- **State Management:** Context API (React) or Phaser's built-in state management
- **Styling:** CSS3 for UI elements outside canvas

**Justification:** Phaser 3 provides:
- Built-in sprite and tilemap systems
- Easy keyboard input handling
- Collision detection
- Scene management for room transitions
- Active community and documentation

#### 4.1.2 Backend
- **Framework:** FastAPI (Python)
- **Server:** Uvicorn (ASGI server)
- **API Design:** RESTful architecture
- **Authentication:** JWT tokens for user sessions

#### 4.1.3 Database
- **Database:** SQLite
- **ORM:** SQLAlchemy (Python)
- **Migrations:** Alembic

### 4.2 System Architecture

#### 4.2.1 Architecture Pattern
- Client-Server architecture
- Frontend renders game and handles user input
- Backend manages data persistence and question delivery
- Stateless API communication via REST

#### 4.2.2 Data Flow
```
User Input → Frontend (Phaser) → API Request → Backend (FastAPI) 
→ Database (SQLite) → API Response → Frontend Update → Render
```

### 4.3 API Endpoints

#### 4.3.1 User Management
- `POST /api/users/register` - Create new user account
- `POST /api/users/login` - Authenticate user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

#### 4.3.2 Game Progress
- `GET /api/progress/{user_id}` - Retrieve user's game progress
- `POST /api/progress/{user_id}` - Save game progress
- `PUT /api/progress/{user_id}/room` - Update current room
- `PUT /api/progress/{user_id}/brightness` - Update brightness level

#### 4.3.3 Question Management
- `GET /api/questions/random` - Get random question by difficulty and topic
  - Query params: `difficulty`, `topic`, `exclude_ids`
- `GET /api/questions/{question_id}` - Get specific question
- `POST /api/questions/answered` - Record answered question
- `GET /api/questions/pool` - Get available questions count

#### 4.3.4 External Question API Integration
- `GET /api/external/questions` - Proxy endpoint to external question source
- Caching layer for frequently accessed questions
- Error handling and fallback to local question bank

### 4.4 Database Schema

#### 4.4.1 Users Table
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);
```

#### 4.4.2 Game Progress Table
```sql
CREATE TABLE game_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    current_room INTEGER DEFAULT 1,
    brightness_level INTEGER DEFAULT 100,
    total_correct INTEGER DEFAULT 0,
    total_incorrect INTEGER DEFAULT 0,
    game_completed BOOLEAN DEFAULT FALSE,
    last_saved TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### 4.4.3 Questions Table (Cached)
```sql
CREATE TABLE questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    external_id VARCHAR(100) UNIQUE,
    question_text TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_answer CHAR(1) NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    topic VARCHAR(50) NOT NULL,
    explanation TEXT,
    cached_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 4.4.4 Answered Questions Table
```sql
CREATE TABLE answered_questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    answered_correctly BOOLEAN NOT NULL,
    answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    room_number INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (question_id) REFERENCES questions(id),
    UNIQUE(user_id, question_id)
);
```

#### 4.4.5 Room Completion Table
```sql
CREATE TABLE room_completion (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    room_number INTEGER NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_taken INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE(user_id, room_number)
);
```

---

## 5. Non-Functional Requirements

### 5.1 Performance
- Game should run at minimum 30 FPS on modern browsers
- API response time < 200ms for 95% of requests
- Database queries optimized with appropriate indexes
- Asset loading time < 3 seconds on standard broadband

### 5.2 Scalability
- Support for 100+ concurrent users
- Question pool of minimum 500 questions
- Efficient caching of frequently accessed data

### 5.3 Compatibility
- **Browsers:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Devices:** Desktop (primary), Tablet (secondary)
- **Screen Resolutions:** 1280x720 minimum

### 5.4 Security
- Password hashing using bcrypt (minimum 12 rounds)
- SQL injection prevention via parameterized queries
- XSS protection on user inputs
- HTTPS required for production
- Rate limiting on API endpoints

### 5.5 Usability
- Intuitive keyboard controls
- Clear visual feedback for all interactions
- Accessible UI design
- Responsive game interface

### 5.6 Reliability
- Auto-save functionality to prevent progress loss
- Graceful error handling and user feedback
- Offline capability for gameplay (questions pre-cached)
- 99% uptime target

---

## 6. User Interface Specifications

### 6.1 Game Screen Layout
- **Main Canvas:** Game rendering area (primary viewport)
- **HUD (Heads-Up Display):**
  - Top-left: Room number (e.g., "Room 3/10")
  - Top-right: Brightness indicator (visual bar or percentage)
  - Bottom: Interaction prompt ("Press SPACE to open chest")

### 6.2 Question Dialog
- **Modal Overlay:** Semi-transparent background
- **Question Panel:**
  - Question text (centered, readable font)
  - Four answer options (A, B, C, D)
  - Submit button
  - Close/Cancel option
- **Feedback Display:**
  - Correct: Green highlight + positive message
  - Incorrect: Red highlight + brightness reduction animation

### 6.3 Menu Screens
- **Main Menu:**
  - New Game
  - Continue Game
  - Settings
  - About
- **Settings:**
  - Volume controls
  - Graphics quality
  - Key bindings
- **Pause Menu:**
  - Resume
  - Save Game
  - Exit to Main Menu

---

## 7. Game Flow Diagram

```
[Start] → [Main Menu] → [New Game / Load Game]
   ↓
[Room 1] → [Chest 1] → [Question Easy] → [Correct?]
   ↓                                          ↓
   ↓                                    [Yes] → [Chest 2]
   ↓                                    [No]  → [-20% Brightness]
   ↓
[Chest 2] → [Question Medium] → [Correct?]
   ↓
[Chest 3] → [Question Hard] → [Correct?]
   ↓
[All 3 Correct?] → [Yes] → [Room Complete] → [Next Room]
                   [No]  → [Continue/Game Over]
   ↓
[Repeat for Rooms 2-10]
   ↓
[Room 10 Complete] → [Victory Screen] → [End]

[Brightness = 0%] → [Game Over] → [Retry/Main Menu]
```

---

## 8. Development Phases

### Phase 1: Setup & Core Mechanics (Week 1-2)
- Project initialization and environment setup
- Database schema creation and migration
- Basic game engine implementation (movement, collision)
- Room rendering system

### Phase 2: Question System Integration (Week 3)
- API development for question retrieval
- External API integration
- Question caching mechanism
- Answer validation logic

### Phase 3: Game Logic & Progression (Week 4)
- Chest interaction system
- Brightness penalty implementation
- Room transition logic
- Progress saving/loading

### Phase 4: UI/UX & Polish (Week 5)
- 8-bit asset integration
- HUD implementation
- Question dialog design
- Menu systems

### Phase 5: Testing & Deployment (Week 6)
- Unit testing (backend)
- Integration testing
- User acceptance testing
- Deployment to production server

---

## 9. Testing Requirements

### 9.1 Unit Testing
- Backend API endpoints (FastAPI test client)
- Database operations (SQLAlchemy)
- Game logic functions

### 9.2 Integration Testing
- Frontend-Backend communication
- External API integration
- Database transactions

### 9.3 User Testing
- Gameplay mechanics validation
- UI/UX feedback
- Performance testing across browsers
- Accessibility testing

---

## 10. Deployment Specifications

### 10.1 Development Environment
- Local SQLite database
- Development server (localhost)
- Hot-reload enabled

### 10.2 Production Environment
- **Frontend Hosting:** Netlify, Vercel, or AWS S3 + CloudFront
- **Backend Hosting:** AWS EC2, DigitalOcean, or Heroku
- **Database:** SQLite file on server (consider PostgreSQL for scale)
- **CI/CD:** GitHub Actions or GitLab CI

### 10.3 Environment Variables
```
DATABASE_URL=sqlite:///./dungeon.db
SECRET_KEY=<jwt-secret-key>
EXTERNAL_QUESTION_API_URL=<api-endpoint>
EXTERNAL_QUESTION_API_KEY=<api-key>
CORS_ORIGINS=https://yourdomain.com
```

---

## 11. Future Enhancements (Optional)

### 11.1 Multiplayer Mode
- Leaderboard system
- Competitive quiz challenges
- Co-op dungeon exploration

### 11.2 Additional Content
- More room themes
- Power-ups and collectibles
- Achievement system
- Daily challenges

### 11.3 Advanced Features
- Sound effects and background music
- Animated sprites
- Boss battles with timed questions
- Story mode with narrative elements

---

## 12. Acceptance Criteria

The project will be considered complete when:
1. ✅ User can create account and login
2. ✅ Hero character moves smoothly with arrow keys
3. ✅ All 10 rooms are navigable
4. ✅ 3 chests per room with working interactions
5. ✅ Questions are fetched from API without repetition
6. ✅ Difficulty increases progressively
7. ✅ Brightness penalty system works correctly
8. ✅ Game ends at 0% brightness
9. ✅ Progress is saved and can be resumed
10. ✅ All questions cover specified topics
11. ✅ Game completion (Room 10) triggers victory state
12. ✅ Responsive UI across supported browsers

---

## 13. Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| External API unavailability | High | Implement local question fallback, cache questions |
| Performance issues on low-end devices | Medium | Optimize sprite rendering, implement quality settings |
| Question pool exhaustion | Medium | Large initial question database, periodic updates |
| User data loss | High | Frequent auto-saves, backup mechanisms |
| Browser compatibility issues | Low | Cross-browser testing, polyfills |

---

## 14. Appendices

### Appendix A: Asset Folder Structure
```
/assets
  /sprites
    /hero
      - hero_idle.png
      - hero_walk.png
    /chests
      - chest_closed.png
      - chest_open.png
  /tiles
    - dungeon_floor.png
    - dungeon_wall.png
  /ui
    - hud_frame.png
    - dialog_box.png
  /audio (optional)
    - chest_open.wav
    - correct_answer.wav
    - wrong_answer.wav
```

### Appendix B: Keyboard Controls
| Key | Action |
|-----|--------|
| ↑ | Move Up |
| ↓ | Move Down |
| ← | Move Left |
| → | Move Right |
| SPACE | Interact (Open/Close Chest) |
| ESC | Pause Menu |

### Appendix C: Question Difficulty Matrix
| Room | Chest 1 | Chest 2 | Chest 3 |
|------|---------|---------|---------|
| 1-3 | Easy | Medium | Hard |
| 4-6 | Medium | Hard | Very Hard |
| 7-10 | Hard | Very Hard | Expert |

---

**Document End**

*This specification is subject to revisions based on stakeholder feedback and technical feasibility assessments.*