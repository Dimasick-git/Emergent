# Getting Started Guide

Welcome to Emergent! 🚀 This guide will help you get started with development and deployment.

## 📋 Prerequisites

Before you start, make sure you have:

- **Node.js** 18+ ([Download](https://nodejs.org))
- **Docker** & **Docker Compose** ([Download](https://www.docker.com/products/docker-desktop))
- **Git** ([Download](https://git-scm.com))
- **A terminal** (bash, zsh, or similar)

## 🚀 Quick Start (5 minutes)

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/Dimasick-git/Emergent.git
cd Emergent

# Create environment file
cp .env.example .env

# Install dependencies
npm install
```

### 2. Start Services

```bash
# Option A: Using Docker Compose (Recommended)
docker-compose up --build

# Option B: Using shell script
./scripts/start.sh

# Option C: Manual - Wait for PostgreSQL to be ready (30s)
# then run:
docker-compose exec backend npm run prisma:migrate deploy
docker-compose exec backend npm run prisma:seed
```

### 3. Access the Application

Open your browser:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Docs (Swagger)**: http://localhost:3001/api/docs
- **MinIO Console**: http://localhost:9001 (minio / minio123)

### 4. Login

Use demo credentials:

```
Email:    demo@example.com
Password: demo123
```

## 🛑 Stop Services

```bash
# Option A: Docker Compose
docker-compose down

# Option B: Using shell script
./scripts/stop.sh
```

## 💻 Development

### Backend Development

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Setup Prisma
npm run prisma:generate
npm run prisma:migrate dev

# Start dev server (with hot reload)
npm run dev

# Run tests
npm run test

# Run linting
npm run lint

# Build for production
npm run build
```

Access backend at: `http://localhost:3001`

### Frontend Development

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start dev server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Access frontend at: `http://localhost:5173` (or `3000` in Docker)

### Database Management

```bash
# Create migration
npm run -w backend prisma:migrate dev --name migration_name

# Reset database (⚠️ Deletes all data)
npm run -w backend prisma:migrate reset

# Open Prisma Studio (GUI)
npm run -w backend prisma:studio

# Generate latest Prisma types
npm run -w backend prisma:generate
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run unit tests
npm run test:unit

# Run E2E tests
npm run test:e2e

# Run with coverage
npm run test:cov

# Run specific test file
npm test -- tests/auth.e2e-spec.ts

# Load testing (requires k6)
npm run test:load
# or manually: k6 run tests/load-test.js
```

## 📚 CLI Usage

The CLI tool helps manage Emergent from command line:

```bash
cd cli
npm install

# Show help
npm run cli -- --help

# Create user
npm run cli -- user create --email test@example.com --password pass123

# List users
npm run cli -- user list

# Create workspace
npm run cli -- workspace create --name "My Team"

# Create channel
npm run cli -- channel create --workspace-id <id> --name general
```

## 📦 Using SDKs

### TypeScript SDK

```bash
# Install from npm (when published)
npm install @emergent/sdk

# Or use local version
cd sdk/ts
npm install
npm run build
```

```typescript
import { EmergentClient } from '@emergent/sdk';

const client = new EmergentClient('http://localhost:3001');

// Authenticate
const { accessToken } = await client.login('demo@example.com', 'demo123');

// Send message
const message = await client.sendMessage('channel-id', 'Hello world!');

// Listen for messages
client.on('message:new', (msg) => {
  console.log('New message:', msg);
});
```

### Python SDK

```bash
cd sdk/python
pip install -e .
```

```python
from emergent import EmergentClient

client = EmergentClient('http://localhost:3001')

# Login
token = client.login('demo@example.com', 'demo123')

# Send message
msg = client.send_message('channel-id', 'Hello from Python!')
```

### Go SDK

```go
package main

import (
    "fmt"
    "github.com/Dimasick-git/Emergent/sdk/go"
)

func main() {
    client := emergent.NewClient("http://localhost:3001")
    
    // Login
    token, _ := client.Login("demo@example.com", "demo123")
    
    // Send message
    msg, _ := client.SendMessage("channel-id", "Hello from Go!")
    fmt.Println(msg)
}
```

## 🐳 Docker Commands

```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend

# Execute command in container
docker-compose exec backend npm run prisma:migrate deploy

# Rebuild specific service
docker-compose build backend

# Remove all containers and volumes (⚠️ Deletes data)
docker-compose down -v

# Clean up unused Docker resources
docker system prune -a
```

## 🔧 Environment Variables

Copy `.env.example` to `.env` and customize:

```bash
# Backend
DEBUG=true
PORT=3001
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRE=24h
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/emergent

# Frontend
VITE_API_URL=http://localhost:3001
VITE_WS_URL=ws://localhost:3001

# Storage (MinIO)
MINIO_ROOT_USER=minio
MINIO_ROOT_PASSWORD=minio123
MINIO_REGION=us-east-1

# Cache (Redis)
REDIS_URL=redis://redis:6379

# Docker
COMPOSE_PROJECT_NAME=emergent
```

## 📝 Common Tasks

### Add a New Feature

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes in backend/frontend
3. Run tests: `npm test`
4. Commit: `git commit -m "feat: add my feature"`
5. Push: `git push origin feature/my-feature`
6. Open Pull Request on GitHub

### Hot Reload Development

```bash
# Backend (runs with nodemon)
cd backend && npm run dev

# Frontend (runs with Vite)
cd frontend && npm run dev

# Both simultaneously (from root)
npm run dev
```

### Deploy to Production

1. Push to GitHub
2. GitHub Actions automatically:
   - Runs tests
   - Builds Docker images
   - Pushes to registry
   - Deploys to production

See `.github/workflows/` for configuration.

### Database Backup

```bash
# Backup database
docker-compose exec -T postgres pg_dump -U postgres emergent > backup.sql

# Restore from backup
docker-compose exec -T postgres psql -U postgres emergent < backup.sql
```

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port in docker-compose.yml
```

### Database Connection Error

```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# If not, start it
docker-compose up -d postgres

# Wait 10 seconds for it to initialize
sleep 10

# Then restart backend
docker-compose restart backend
```

### Node Modules Issues

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm install -w backend
npm install -w frontend
```

### WebSocket Connection Error

- Check if backend is running: `docker-compose ps backend`
- Verify WebSocket URL in frontend `.env`: `VITE_WS_URL=ws://localhost:3001`
- Check browser console for errors (F12)

## 📚 Next Steps

- 📖 Read [Backend Development Guide](./backend.md)
- 🎨 Read [Frontend Development Guide](./frontend.md)
- 🔌 Read [API Reference](./api.md)
- 🏗️ Read [Architecture Overview](./architecture.md)
- 👥 Read [Contributing Guidelines](./contributing.md)

## 💬 Need Help?

- 📋 [GitHub Issues](https://github.com/Dimasick-git/Emergent/issues)
- 💭 [GitHub Discussions](https://github.com/Dimasick-git/Emergent/discussions)
- 📧 Email: support@emergent.dev

## 🎉 Welcome Aboard!

You're all set! Start exploring Emergent and building amazing features.

Happy coding! 🚀

---

Last Updated: April 2024
