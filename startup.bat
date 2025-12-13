@echo off
echo ========================================
echo 🚀 Starting Data Science Dungeon...
echo ========================================

echo stats: Starting Backend Server (Port 8080)...
start "Backend Server" cmd /k "cd backend && call .\venv\Scripts\activate.bat && python -m uvicorn main:app --reload --port 8080"

timeout /t 2 /nobreak >nul

echo stats: Starting Frontend Server (Port 8000)...
start "Frontend Server" cmd /k "python -m http.server 8000"

echo ========================================
echo ✅ Game is Running!
echo 👉 Play here: http://localhost:8000
echo ========================================
echo Close the popup windows to stop servers.
pause
