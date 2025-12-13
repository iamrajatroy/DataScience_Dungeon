# Data Science Dungeon

**Data Science Dungeon** is an 8-bit style educational browser game where you explore procedural rooms, open chests by answering Data Science questions, and manage your "torch brightness" (health) to survive.

<img src="assets/hero.png" width="64" /> <img src="assets/chest.png" width="64" />

## 🎮 Game Features
- **Procedural Dungeon:** 10 Rooms of increasing difficulty.
- **Data Science Quiz:** 500+ questions covering ML, Stats, Python, and Deep Learning.
- **Reactive UI:** Instant feedback on scores and health.
- **Survival Mechanic:** Wrong answers dim your screen. 0% brightness = Game Over.
- **Offline Support:** Plays seamlessly offline, syncing progress when the server returns.
- **Progress Saving:** Auto-saves to LocalStorage (and Server if available).

## 🚀 Quick Start
### Prerequisites
- Python 3.8+
- Modern Web Browser (Chrome/Firefox/Safari)

### One-Click Launch
Run the startup script to launch both the backend API and frontend server:
```bash
chmod +x startup.sh
./startup.sh
```
Open **[http://localhost:8000](http://localhost:8000)** in your browser.

---

## 🛠 Manual Setup
If you prefer running components separately:

### 1. Backend (API & Database)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8080
```

### 2. Frontend (Static Server)
In the project root:
```bash
python3 -m http.server 8000
```

## 🧠 How to Play
1.  **Move:** Use `WASD` or `Arrow Keys`.
2.  **Interact:** Press `SPACE` near a Chest.
3.  **Answer:** Select the correct option.
    - **Correct:** Earning points, clearing the chest.
    - **Incorrect:** Losing 20% Torch Brightness (Health).
4.  **Advance:** Clear all 3 chests in a room to unlock the Portal to the next level.
5.  **Win:** Complete Room 10.

## 📁 Project Structure
- `js/`: Game logic (GameState, Player, Room, UI).
- `backend/`: FastAPI server for user auth and progress tracking.
- `assets/`: 8-bit sprite assets.
- `styles.css`: Retro NES.css styling.

## 🤝 Contributing
Feel free to add new questions to `backend/questions.json`!
