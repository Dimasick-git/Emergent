#!/bin/bash

# Initialize Emergent project locally

echo "🚀 Emergent Project Initialization"
echo "===================================="

# Check prerequisites
echo "Checking prerequisites..."
command -v docker >/dev/null 2>&1 || { echo "❌ Docker is required but not installed."; exit 1; }
command -v docker-compose >/dev/null 2>&1 || { echo "❌ Docker Compose is required but not installed."; exit 1; }
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is required but not installed."; exit 1; }

echo "✓ Prerequisites met"

# Setup environment
echo ""
echo "Setting up environment..."
if [ ! -f .env ]; then
  cp .env.example .env
  echo "✓ .env file created from template"
fi

# Install dependencies
echo ""
echo "Installing dependencies..."
npm install
npm install -w backend
npm install -w frontend
npm install -w cli

echo "✓ Dependencies installed"

# Build Docker images
echo ""
echo "Building Docker images..."
docker-compose build

echo "✓ Docker images built"

# Start services
echo ""
echo "Starting services..."
docker-compose up -d

echo "✓ Services started"

# Wait for database
echo ""
echo "Waiting for database..."
sleep 5

# Run migrations
echo ""
echo "Running database migrations..."
docker-compose exec -T backend npm run prisma:migrate deploy
docker-compose exec -T backend npm run prisma:seed

echo "✓ Database initialized"

# Show URLs
echo ""
echo "✅ Emergent is ready!"
echo ""
echo "📍 Access your application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:3001"
echo "   API Docs: http://localhost:3001/api/docs"
echo ""
echo "🔐 Demo Credentials:"
echo "   Email:    demo@example.com"
echo "   Password: demo123"
echo ""
echo "📖 Documentation: ./docs"
echo "🐳 Manage services: docker-compose logs -f"
