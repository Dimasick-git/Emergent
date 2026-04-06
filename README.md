# # Emergent 🚀

**A private messenger platform for developers with real-time collaboration, workspaces, and secure communication.**

---

## 🌟 Features

- **Workspaces** - Create isolated team spaces with custom settings
- **Channels** - Public and private channels for organized conversations
- **Real-time Messaging** - Instant messaging with WebSocket support
- **Markdown Support** - Rich text formatting with syntax highlighting
- **File Sharing** - Secure file uploads with cloud storage
- **Threading** - Organize conversations in threads
- **Voice Messages** - Send voice alerts and messages
- **Reactions** - Emoji reactions and message feedback
- **User Presence** - See who's online and active
- **Read Receipts** - Track message delivery and read status
- **Multi-platform** - Web, mobile (iOS/Android), and CLI support

---

## 📦 What's Included

```
Emergent/
├── backend/              # NestJS API server with 8 modules
├── frontend/             # React 18 web application
├── mobile/               # React Native mobile app (Template)
├── sdk/
│   ├── ts/              # TypeScript SDK
│   ├── python/          # Python SDK
│   └── go/              # Go SDK
├── cli/                 # Command-line interface
├── docs/                # Comprehensive documentation
├── infra/               # Docker & deployment configuration
├── tests/               # E2E and load tests
└── scripts/             # Utility scripts
```

---

## 🚀 Quick Start

### Prerequisites

- **Docker** & **Docker Compose**
- **Node.js 18+**
- **Git**

### Get Running in 1 Minute

```bash
# Clone
git clone https://github.com/Dimasick-git/Emergent.git
cd Emergent

# Setup
cp .env.example .env

# Run
docker-compose up --build

# Access
# 🌐 Frontend: http://localhost:3000
# 📚 API Docs: http://localhost:3001/api/docs

# Demo Login
# Email: demo@example.com
# Password: demo123
```

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [Getting Started](./docs/getting-started.md) | Step-by-step setup guide |
| [API Reference](./docs/api.md) | Complete REST API endpoints |
| [Architecture](./docs/architecture.md) | System design & components |
| [Database Schema](./docs/db.md) | Data model & relationships |
| [Backend Dev](./docs/backend.md) | NestJS development guide |
| [Frontend Dev](./docs/frontend.md) | React development guide |
| [SDK Guide](./docs/sdk.md) | SDKs for TS/Python/Go |
| [CLI Usage](./docs/cli.md) | Command-line tools |
| [Infrastructure](./docs/infra.md) | Docker & deployment |
| [Deployment](./docs/deployment.md) | Production deployment guide |
| [Contributing](./docs/contributing.md) | How to contribute |
| [Architecture Diagrams](./docs/diagrams.md) | Visual architecture |

---

## 🛠️ Tech Stack

### Backend
- **NestJS** - Scalable Node.js framework
- **TypeScript** - Type-safe development
- **PostgreSQL** - Reliable database
- **Prisma** - Modern ORM
- **Socket.IO** - Real-time communication
- **JWT** - Secure authentication

### Frontend
- **React 18** - UI library
- **Vite** - Next-gen build tool
- **TailwindCSS** - Utility-first CSS
- **Zustand** - State management
- **Socket.IO Client** - Real-time client

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Service orchestration
- **Nginx** - Reverse proxy
- **Redis** - Caching layer
- **MinIO** - S3-compatible storage
- **GitHub Actions** - CI/CD pipelines

---

## 🎯 Development

### Local Development

```bash
# Backend (with hot reload)
cd backend && npm run dev

# Frontend (with hot reload)
cd frontend && npm run dev

# Both simultaneously
npm run dev
```

### Testing

```bash
# All tests
npm test

# Unit tests
npm run test:unit

# E2E tests
npm run test:e2e

# Coverage report
npm run test:cov
```

### Code Quality

```bash
# Lint
npm run lint

# Format
npm run format

# Type check
npm run type-check
```

---

## 🚢 Deployment

### Docker Compose (Production)

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Cloud Platforms

- **Railway** - Recommended for quick start
- **DigitalOcean** - App Platform or Droplets
- **AWS** - ECS, Lambda, or EC2
- **Google Cloud** - Cloud Run or Compute Engine
- **Azure** - Container Instances or App Service

See [Deployment Guide](./docs/deployment.md) for detailed instructions.

---

## 🤝 Contributing

We welcome contributions! 

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

See [Contributing Guidelines](./docs/contributing.md) for more details.

---

## 🐛 Support

- 📖 **Documentation**: Check [./docs](./docs) folder
- 🐛 **Issues**: [GitHub Issues](https://github.com/Dimasick-git/Emergent/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/Dimasick-git/Emergent/discussions)
- 📧 **Email**: support@emergent.dev

---

## 📊 Project Status

| Component | Status | Version |
|-----------|--------|---------|
| Backend | ✅ Complete | 0.1.0 |
| Frontend | ✅ Complete | 0.1.0 |
| Mobile | 🟡 Planned | - |
| SDKs | ✅ Complete | 0.1.0 |
| CLI | ✅ Complete | 0.1.0 |
| Docs | ✅ Complete | 0.1.0 |
| CI/CD | ✅ Complete | - |

---

## 📜 License

MIT © 2024 Emergent Team

See [LICENSE](./LICENSE) for details.

---

## 🙏 Acknowledgments

- Built with ❤️ for developers
- Inspired by Slack and Discord
- Community-driven development

---

## 📱 Screenshots & Examples

### Web Interface

```
┌─ Emergent Dashboard ──────────────────────────┐
│                                               │
│  Sidebar (Workspaces & Channels)              │
│  ├─ 🏢 Emergent Dev                          │
│  │  ├─ 🔓 #general                           │
│  │  ├─ 🔓 #random                            │
│  │  └─ 🔒 #dev-only                          │
│  │                                            │
│  Chat Area                                    │
│  ├─ [User1]: Hello! 👋                       │
│  ├─ [User2]: Hey there! 🚀                   │
│  └─ [Input] Send message...                  │
│                                               │
└───────────────────────────────────────────────┘
```

### API Usage

```bash
# Send a message
curl -X POST http://localhost:3001/api/messages/channel-id \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"content": "Hello!"}'

# Response
{
  "id": "msg_123",
  "channelId": "ch_456",
  "userId": "user_789",
  "content": "Hello!",
  "createdAt": "2024-04-06T00:00:00Z"
}
```

---

**Made with ☕ and ❤️ by the Emergent Team**

[View Full Documentation](./docs)