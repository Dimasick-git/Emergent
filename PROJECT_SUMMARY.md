# Emergent - Private Messenger for Developers

🚀 **Full-Stack Project** | Production-Ready | Open Source

---

## 📋 Quick Links

- 📖 **[Documentation](./docs/index.md)** - Complete guides
- 🔌 **[API Reference](./docs/api.md)** - REST API endpoints
- 🏗️ **[Architecture](./docs/architecture.md)** - System design
- 📦 **[SDK Guide](./docs/sdk.md)** - SDKs for TS, Python, Go

---

## ✨ Features

✅ **Workspaces** - Isolated team spaces  
✅ **Channels** - Public & private chat rooms  
✅ **Real-time** - WebSocket messaging  
✅ **Markdown** - Rich text with syntax highlighting  
✅ **Files** - Secure upload storage  
✅ **Voice** - Voice message support  
✅ **Threads** - Organized conversations  
✅ **Auth** - JWT + Refresh tokens  
✅ **Multi-platform** - Web, iOS, Android  

---

## 🏗️ What's Inside

```
Emergent/
├── backend/          # NestJS API (TypeScript)
├── frontend/         # React app (TypeScript)
├── mobile/           # React Native (Expo)
├── sdk/
│   ├── ts/          # TypeScript SDK
│   ├── python/      # Python SDK
│   └── go/          # Go SDK
├── cli/             # Command-line tool
├── docs/            # Documentation
├── infra/           # Docker & Nginx
├── .github/workflows/ # CI/CD pipelines
└── tests/           # Test suites
```

---

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+

### Get It Running

```bash
# 1. Clone & setup
git clone https://github.com/Dimasick-git/Emergent.git
cd Emergent
cp .env.example .env

# 2. Start everything
docker-compose up --build

# 3. Access
# Frontend: http://localhost:3000
# API Docs: http://localhost:3001/api/docs

# 4. Demo Login
# Email: demo@example.com
# Password: demo123
```

---

## 📚 Development

### Backend Development

```bash
cd backend
npm install
npm run prisma:migrate dev
npm run dev
```

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

### Run Tests

```bash
npm run test        # Unit tests
npm run test:e2e    # E2E tests
npm run lint        # Linting
```

---

## 🔗 API Example

### Send Message

```bash
curl -X POST http://localhost:3001/api/messages/channel-id \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-id",
    "content": "Hello! 👋"
  }'
```

### WebSocket Events

```javascript
const ws = new WebSocket('ws://localhost:3001/ws?token=YOUR_TOKEN');

ws.send(JSON.stringify({
  event: 'channel:subscribe',
  channelId: 'channel-id'
}));

ws.onmessage = (event) => {
  const { event: type, data } = JSON.parse(event.data);
  console.log('Event:', type, 'Data:', data);
};
```

---

## 🛠️ Tech Stack

### Backend
- **NestJS** - Node.js framework
- **TypeScript** - Type safety
- **PostgreSQL** - Database
- **Prisma** - ORM
- **JWT** - Authentication
- **Socket.IO** - Real-time

### Frontend
- **React 18** - UI library
- **Vite** - Bundler
- **TailwindCSS** - Styling
- **Zustand** - State management
- **Socket.IO Client** - WebSocket

### Infrastructure
- **Docker** - Containerization
- **Nginx** - Reverse proxy
- **Redis** - Caching
- **MinIO** - File storage
- **GitHub Actions** - CI/CD

---

## 📖 Documentation

| Guide | Link |
|-------|------|
| Getting Started | [docs/index.md](./docs/index.md) |
| API Reference | [docs/api.md](./docs/api.md) |
| Architecture | [docs/architecture.md](./docs/architecture.md) |
| Database | [docs/db.md](./docs/db.md) |
| Backend Dev | [docs/backend.md](./docs/backend.md) |
| Frontend Dev | [docs/frontend.md](./docs/frontend.md) |
| CLI Usage | [docs/cli.md](./docs/cli.md) |
| Infrastructure | [docs/infra.md](./docs/infra.md) |
| Mobile | [docs/mobile.md](./docs/mobile.md) |
| Contributing | [docs/contributing.md](./docs/contributing.md) |

---

## 🧪 Testing

```bash
# Unit tests
npm run test -w backend

# E2E tests
npm run test:e2e -w backend

# Load testing (requires k6)
k6 run tests/load-test.js

# Coverage
npm run test:cov
```

---

## 📦 Deployment

### Docker Compose (Development)

```bash
docker-compose up --build
```

### Production

```bash
# Build images
docker build -t emergent-backend ./backend
docker build -t emergent-frontend ./frontend

# Deploy to your platform
# (Kubernetes, AWS, DigitalOcean, Render, Railway, etc.)
```

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./docs/contributing.md) for guidelines.

### Development Setup

```bash
git clone <your-fork>
cd Emergent
npm install
npm run dev
```

### Pull Request Process

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

---

## 🐛 Reporting Issues

- **Bug Reports** → [GitHub Issues](https://github.com/Dimasick-git/Emergent/issues)
- **Security Issues** → security@example.com (not public)
- **Discussions** → [GitHub Discussions](https://github.com/Dimasick-git/Emergent/discussions)

---

## 📊 Project Status

- ✅ MVP Complete (v0.1.0)
- 🔄 Beta Phase
- 🚧 Planned: Video calls, E2E encryption, Advanced search

---

## 📜 License

MIT © 2024 Emergent Team

See [LICENSE](./LICENSE) for details.

---

## 🔗 Links

- 🌐 [Website](https://emergent.dev)
- 📖 [Documentation](./docs)
- 🐙 [GitHub](https://github.com/Dimasick-git/Emergent)
- 💬 [Discussions](https://github.com/Dimasick-git/Emergent/discussions)
- 🐛 [Issues](https://github.com/Dimasick-git/Emergent/issues)

---

**Built with ❤️ for developers** 🚀
