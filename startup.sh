#!/bin/bash

# Terminate both processes on Ctrl+C
trap 'kill 0' SIGINT

echo "========================================"
echo "🚀 Starting Data Science Dungeon..."
echo "========================================"

# Start Backend
echo "stats: Starting Backend Server (Port 8080)..."
cd backend
python3 -m uvicorn main:app --reload --port 8080 &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to initialize
sleep 2

# Start Frontend
echo "stats: Starting Frontend Server (Port 8000)..."
python3 -m http.server 8000 &
FRONTEND_PID=$!

echo "========================================"
echo "✅ Game is Running!"
echo "👉 Play here: http://localhost:8000"
echo "========================================"
echo "Press Ctrl+C to stop servers."

wait
