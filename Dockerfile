FROM python:3.10-slim

WORKDIR /app

# Install system dependencies if any (none needed for this simple app)

# Copy requirements
COPY backend/requirements.txt requirements.txt

# Install python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Environment setup
ENV PORT=8080
ENV PYTHONPATH=/app/backend

# Run the application
CMD uvicorn backend.main:app --host 0.0.0.0 --port ${PORT}
