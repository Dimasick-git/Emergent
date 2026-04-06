# 📖 Emergent Documentation

Welcome to the Emergent documentation. This guide will help you understand the architecture, API, and how to use the platform.

## Table of Contents

- [API Documentation](./api.md) - REST API endpoints
- [Architecture](./architecture.md) - System design and components
- [Database Schema](./db.md) - Data models and relationships
- [Frontend Guide](./frontend.md) - React development
- [Backend Guide](./backend.md) - NestJS development
- [Mobile Guide](./mobile.md) - React Native/Flutter
- [SDK Guide](./sdk.md) - SDK usage examples
- [CLI Guide](./cli.md) - Command-line interface
- [Infrastructure](./infra.md) - Docker and deployment
- [Contributing Guide](./contributing.md) - How to contribute

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+
- PostgreSQL 14+

### Setup

```bash
# 1. Clone repository
git clone https://github.com/Dimasick-git/Emergent.git
cd Emergent

# 2. Configure environment
cp .env.example .env

# 3. Start with Docker
docker-compose up --build

# 4. Create first user
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "username": "admin",
    "password": "securepassword"
  }'

# 5. Access application
# Frontend: http://localhost:3000
# API: http://localhost:3001/api
# API Docs: http://localhost:3001/api/docs
```

## Key Features

- **Workspaces**: Isolated communication spaces for teams
- **Channels**: Public and private message groups
- **Real-time Messaging**: WebSocket-based instant communication
- **Markdown Support**: Rich text messages with code highlighting
- **File Sharing**: Secure file upload and download
- **Voice Messages**: Record and share voice notes
- **Message Reactions**: React to messages with emojis
- **Threading**: Organize conversations in threads
- **User Presence**: See who's online

## Architecture Overview

```
┌─────────────────────────────────────────────┐
│            Frontend (React)                 │
│        - Components                         │
│        - State Management (Zustand)         │
│        - WebSocket Client                   │
└─────────────────┬───────────────────────────┘
                  │ HTTP/WebSocket
┌─────────────────▼───────────────────────────┐
│        Backend (NestJS)                     │
│        - REST API                           │
│        - WebSocket Gateway                  │
│        - Authentication                     │
│        - Message Processing                 │
└──┬────────────────────────────┬──────────┬──┘
   │                            │          │
   ▼                            ▼          ▼
PostgreSQL              Redis Cache      MinIO Storage
Database               (Caching)         (Files)
```

## Development Guide

### Backend Development

```bash
cd backend

# Install dependencies
npm install

# Run migrations
npm run prisma:migrate dev

# Start development server
npm run dev

# Run tests
npm run test
```

### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## API Authentication

All API requests require a JWT token in the Authorization header:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3001/api/users/me
```

## WebSocket Events

Subscribe to real-time updates using WebSocket:

```javascript
const ws = new WebSocket('ws://localhost:3001/ws?token=YOUR_TOKEN');

// Subscribe to channel
ws.send(JSON.stringify({
  event: 'channel:subscribe',
  channelId: '123'
}));

// Listen for new messages
ws.addEventListener('message', (event) => {
  const { event: eventType, data } = JSON.parse(event.data);
  if (eventType === 'message:created') {
    console.log('New message:', data);
  }
});
```

## Deployment

### Docker Compose (Recommended for development)

```bash
docker-compose up --build
```

### Production Deployment

See [Infrastructure Guide](./infra.md) for production setup.

## Troubleshooting

### Connection Refused

Ensure all services are running:
```bash
docker-compose ps
```

### Database Migration Issues

Reset database:
```bash
npm run prisma:migrate reset
```

### Frontend Build Issues

Clear cache and rebuild:
```bash
rm -rf frontend/dist node_modules
npm install && npm run build
```

## Support

- 📖 [Documentation](./docs)
- 🐛 [Report Issues](https://github.com/Dimasick-git/Emergent/issues)
- 💬 [Discussions](https://github.com/Dimasick-git/Emergent/discussions)

## License

MIT © 2024 Emergent Team
