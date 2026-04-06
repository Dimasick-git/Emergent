#!/bin/bash

# Quick start script

echo "🚀 Starting Emergent Development Environment"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker is not running. Please start Docker."
  exit 1
fi

# Build and start services
echo "Building services..."
docker-compose build

echo "Starting services..."
docker-compose up -d

echo ""
echo "✅ Services started!"
echo ""
echo "📍 Access points:"
echo "   Frontend:  http://localhost:3000"
echo "   Backend:   http://localhost:3001"
echo "   API Docs:  http://localhost:3001/api/docs"
echo "   MinIO:     http://localhost:9001"
echo ""
echo "🛑 To stop services: docker-compose down"
echo "📊 To see logs: docker-compose logs -f"
