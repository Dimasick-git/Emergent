# Architecture

## System Design

Emergent follows a modern microservices-inspired architecture with clear separation of concerns.

## Components

### Frontend (React + Vite)
- **Framework**: React 18 with TypeScript
- **Styling**: TailwindCSS
- **State**: Zustand
- **Real-time**: Socket.IO client
- **Bundler**: Vite
- **UI Components**: Custom components (ChatHeader, Sidebar, MessageBubble, MessageInput)

### Backend (NestJS)
- **Framework**: NestJS with TypeScript
- **API**: REST endpoints
- **Real-time**: WebSocket Gateway
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with refresh tokens
- **Storage**: MinIO (S3-compatible)
- **Caching**: Redis
- **Documentation**: Swagger/OpenAPI

### Database (PostgreSQL)
- User management
- Workspace management
- Channel management
- Message storage
- File metadata
- Thread management
- Message reactions

### Cache (Redis)
- Session management
- Real-time presence
- Message caching
- Rate limiting

### Storage (MinIO)
- File storage
- Voice messages
- User avatars
- Backups

## Data Flow

```
User Input
    ↓
Frontend (React)
    ↓
WebSocket/HTTP Request
    ↓
API Gateway (Nginx)
    ↓
NestJS Backend
    ↓
PostgreSQL (Data Persistence)
Redis (Cache)
MinIO (File Storage)
    ↓
Response to Frontend
    ↓
UI Update (Real-time)
```

## Module Structure

### Backend Modules

```
Backend
├── Auth Module
│   ├── JWT Strategy
│   ├── Auth Service
│   └── Auth Controller
├── Users Module
│   ├── Users Service
│   └── Users Controller
├── Workspaces Module
│   ├── Workspaces Service
│   └── Workspaces Controller
├── Channels Module
│   ├── Channels Service
│   └── Channels Controller
├── Messages Module
│   ├── Messages Service
│   └── Messages Controller
├── Files Module
│   ├── Files Service
│   └── Files Controller
├── WebSocket Gateway
│   └── Messaging Gateway
└── Health Module
    └── Health Controller
```

### Frontend Components

```
Frontend
├── Pages
│   ├── Login
│   └── Chat
├── Components
│   ├── ChatHeader
│   ├── Sidebar
│   ├── MessageBubble
│   └── MessageInput
├── Store (Zustand)
│   ├── Auth Store
│   └── Chat Store
├── API Client
│   ├── Auth API
│   ├── Users API
│   ├── Workspaces API
│   ├── Channels API
│   └── Messages API
└── Hooks
    └── useSocket
```

## Security

- **Authentication**: JWT tokens with expiration
- **Refresh Tokens**: Separate refresh token rotation
- **Password**: Bcrypt hashing
- **CORS**: Configured to specific origins
- **Rate Limiting**: 100 requests per 15 minutes
- **SQL Injection**: Prisma ORM prevents injection
- **XSS**: React auto-escaping
- **HTTPS**: Ready for HTTPS deployment

## Performance Optimizations

- **Caching**: Redis for session and message caching
- **Database Indexing**: Indexed queries on frequently used fields
- **Connection Pooling**: PostgreSQL connection pooling
- **Message Pagination**: Load messages in batches (default: 50)
- **Compression**: Gzip compression for HTTP responses
- **Lazy Loading**: Frontend lazy loads components
- **WebSocket**: Real-time updates over WebSocket
- **CDN Ready**: Static assets cacheable

## Scalability

### Horizontal Scaling

1. **Frontend**: Served via CDN or multiple Nginx instances
2. **Backend**: Multiple NestJS instances behind load balancer
3. **Database**: PostgreSQL replicas for read scaling
4. **Cache**: Redis Cluster for cache scaling

### Database Sharding

Future implementation for very large datasets:
- Shard by workspace ID
- Shard by user ID

## Deployment Architecture

```
┌─────────────────────────────────────────┐
│          GitHub Pages (Frontend)        │
│        + GitHub Releases (Backend)      │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│        Docker Container Registry        │
│           (GHCR - GitHub)               │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         Orchestration Platform          │
│    (Kubernetes, Docker Swarm, etc.)     │
└─────────────────┬───────────────────────┘
                  │
    ┌─────────────┴─────────────┐
    ▼                           ▼
┌─────────────┐         ┌──────────────┐
│   Backend   │         │   Frontend   │
│ (NestJS)    │         │   (React)    │
└──────┬──────┘         └──────────────┘
       │
    ┌──┴──────────────┐
    ▼                 ▼
PostgreSQL         Redis/MinIO
```

## Monitoring & Observability

- **Logs**: Pino logging on backend
- **Health Checks**: /api/health endpoint
- **Metrics**: Ready for Prometheus integration
- **Tracing**: Ready for distributed tracing

## Future Improvements

- Message search with full-text indexing
- Message encryption (E2E)
- Video/Audio calls
- Offline message queue
- Analytics dashboard
- Mobile notifications
- GitHub integration
- Slack integration
