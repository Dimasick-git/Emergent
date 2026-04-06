# Architecture Diagrams

## System Architecture

```mermaid
graph TB
    Client["🖥️ Web Client<br/>(React)"]
    Mobile["📱 Mobile Client<br/>(React Native)"]
    SDK["📦 SDK Clients<br/>(TS/Python/Go)"]
    CLI["🖨️ CLI Client<br/>(Commander)"]
    
    Client -->|HTTP/WebSocket| Gateway
    Mobile -->|HTTP/WebSocket| Gateway
    SDK -->|HTTP/WebSocket| Gateway
    CLI -->|HTTP| Gateway
    
    subgraph API["API Layer"]
        Gateway["Nginx<br/>Reverse Proxy<br/>:80, :443"]
        Gateway --> Backend["NestJS Backend<br/>:3001"]
    end
    
    subgraph Services["Service Layer"]
        Backend -->|Prisma ORM| DB["PostgreSQL<br/>Database"]
        Backend -->|Socket.IO| WS["WebSocket<br/>Server"]
        Backend --> Cache["Redis<br/>Cache"]
        Backend --> Storage["MinIO<br/>S3 Storage"]
    end
    
    DB -.->|Persistence| Backup["Backup<br/>System"]
    WS -.->|Real-time| EventBus["Event Bus"]
    
    style Gateway fill:#4CAF50,stroke:#2E7D32,color:#fff
    style Backend fill:#2196F3,stroke:#1565C0,color:#fff
    style Client fill:#FF9800,stroke:#E65100,color:#fff
    style Mobile fill:#FF9800,stroke:#E65100,color:#fff
```

## Database Schema

```mermaid
erDiagram
    USER ||--o{ WORKSPACE_MEMBER : joins
    USER ||--o{ CHANNEL_MEMBER : joins
    USER ||--o{ MESSAGE : sends
    USER ||--o{ THREAD : sends_thread
    
    WORKSPACE ||--o{ WORKSPACE_MEMBER : has
    WORKSPACE ||--o{ CHANNEL : has
    WORKSPACE ||--o{ FILE : contains
    
    CHANNEL ||--o{ CHANNEL_MEMBER : has
    CHANNEL ||--o{ MESSAGE : receives
    CHANNEL ||--o{ FILE : contains
    
    MESSAGE ||--o{ REACTION : gets
    MESSAGE ||--o{ THREAD : starts
    MESSAGE ||--o{ FILE : has
    
    USER {
        string id PK
        string email UK
        string username UK
        string password
        string displayName
        datetime createdAt
    }
    
    WORKSPACE {
        string id PK
        string name
        string slug
        string description
        datetime createdAt
    }
    
    CHANNEL {
        string id PK
        string workspaceId FK
        string name
        string slug
        string description
        string type
        datetime createdAt
    }
    
    MESSAGE {
        string id PK
        string channelId FK
        string userId FK
        string content
        string type
        datetime createdAt
    }
```

## Component Architecture

```mermaid
graph LR
    subgraph Frontend["Frontend (React)"]
        Router["Router"]
        AuthPage["Auth Page"]
        ChatPage["Chat Page"]
        Components["Components<br/>Sidebar | Header<br/>MessageBubble | Input"]
        Store["Zustand Store<br/>auth | chat"]
        API["API Client"]
    end
    
    subgraph Backend["Backend (NestJS)"]
        AuthModule["Auth Module<br/>register | login<br/>refresh"]
        UsersModule["Users Module<br/>profile | settings"]
        WorkspaceModule["Workspace Module<br/>create | list | delete"]
        ChannelModule["Channel Module<br/>create | list | members"]
        MessageModule["Message Module<br/>send | get | reactions"]
        FileModule["File Module<br/>upload | download"]
        GatewayModule["WebSocket Gateway<br/>events | subscriptions"]
        HealthModule["Health Module<br/>checks"]
    end
    
    subgraph Infra["Infrastructure"]
        DB[(Database)]
        Cache[(Redis Cache)]
        Storage[(MinIO)]
    end
    
    Frontend --> API
    API -->|REST| AuthModule
    API -->|REST| UsersModule
    API -->|REST| WorkspaceModule
    API -->|REST| ChannelModule
    API -->|REST| MessageModule
    API -->|REST| FileModule
    API -->|WebSocket| GatewayModule
    
    AuthModule --> DB
    UsersModule --> DB
    WorkspaceModule --> DB
    ChannelModule --> DB
    MessageModule --> DB
    FileModule --> Storage
    GatewayModule --> Cache
    
    style Frontend fill:#FF9800,stroke:#E65100,color:#fff
    style Backend fill:#2196F3,stroke:#1565C0,color:#fff
    style Infra fill:#4CAF50,stroke:#2E7D32,color:#fff
```

## Deployment Flow

```mermaid
graph LR
    Code["📝 Source Code<br/>GitHub"]
    
    Code -->|Push| CI["🔄 CI Pipeline<br/>Lint | Test | Build"]
    
    CI -->|Success| Registry["🐳 Docker Registry<br/>Image Storage"]
    
    Registry -->|Pull| Prod["🚀 Production<br/>Docker Compose"]
    
    Prod --> Services["Services<br/>Backend | Frontend<br/>Database | Redis<br/>MinIO | Nginx"]
    
    Services -->|Monitor| Health["📊 Health Checks<br/>Liveness | Readiness"]
    
    Health -->|Alert| Team["👥 Team<br/>Notifications"]
    
    style Code fill:#F57C00,stroke:#E65100,color:#fff
    style CI fill:#1565C0,stroke:#0D47A1,color:#fff
    style Registry fill:#4CAF50,stroke:#2E7D32,color:#fff
    style Prod fill:#7B1FA2,stroke:#4A148C,color:#fff
    style Services fill:#00838F,stroke:#006064,color:#fff
    style Health fill:#D32F2F,stroke:#B71C1C,color:#fff
    style Team fill:#F57C00,stroke:#E65100,color:#fff
```

## Message Flow (Real-time)

```mermaid
sequenceDiagram
    participant User1 as User 1<br/>(Chat App)
    participant WS as WebSocket<br/>Server
    participant DB as Database
    participant User2 as User 2<br/>(Chat App)
    
    User1->>WS: Send message via WebSocket
    WS->>DB: Save message to database
    DB->>WS: Message confirmed
    WS->>User1: Acknowledge (read receipt)
    WS->>User2: broadcast:message event
    User2->>User2: Update UI with new message
    
    User2->>User2: Send reaction emoji
    User2->>WS: Add reaction (WebSocket)
    WS->>DB: Save reaction
    WS->>User1: broadcast:reaction event
    User1->>User1: Update message with reaction
    
    Note over User1,User2: Type indicator
    User1->>WS: typing:start event
    WS->>User2: Channel event: User1 typing
    User2->>User2: Show "User1 is typing..."
```

## Authentication Flow

```mermaid
graph TD
    Login["User Login<br/>email + password"]
    
    Login -->|POST /auth/login| Backend["Backend<br/>Verify credentials"]
    
    Backend -->|Check DB| DB["Database<br/>Find user"]
    
    DB -->|User found| Compare["Compare<br/>bcrypt hash"]
    
    Compare -->|Valid| Generate["Generate JWT<br/>access token<br/>refresh token"]
    
    Generate -->|Return| Client["Client<br/>Store tokens<br/>localStorage"]
    
    Client -->|Every request| Intercept["Axios Interceptor<br/>Add auth header"]
    
    Intercept -->|Authorization: Bearer| Protected["Protected Route<br/>GuardCheck"]
    
    Protected -->|Valid| Allow["✅ Allow"]
    Protected -->|Invalid/Expired| Refresh["🔄 Refresh<br/>Token endpoint"]
    
    Refresh -->|Get new access token| Allow
    
    style Login fill:#FF9800,stroke:#E65100,color:#fff
    style Backend fill:#2196F3,stroke:#1565C0,color:#fff
    style Client fill:#4CAF50,stroke:#2E7D32,color:#fff
    style Allow fill:#4CAF50,stroke:#2E7D32,color:#fff
```

## Workspace & Channel Hierarchy

```mermaid
graph TD
    Workspace["🏢 Workspace<br/>Emergent Dev Team"]
    
    Workspace --> Channels["Channels"]
    
    Channels --> General["#general<br/>Main discussion"]
    Channels --> Random["#random<br/>Off-topic"]
    Channels --> Dev["#dev<br/>Development"]
    Channels --> Design["#design<br/>Design work"]
    
    General --> Members1["👥 Members<br/>Owner, Members"]
    Random --> Members2["👥 Members"]
    Dev --> Members3["👥 Members<br/>Developers only"]
    Design --> Members4["👥 Members<br/>Designers"]
    
    Members1 --> Content1["💬 Messages<br/>📎 Files<br/>🔗 Threads"]
    Members2 --> Content2["💬 Messages"]
    Members3 --> Content3["💬 Messages<br/>📎 Files"]
    Members4 --> Content4["💬 Messages"]
    
    style Workspace fill:#2196F3,stroke:#1565C0,color:#fff
    style Channels fill:#4CAF50,stroke:#2E7D32,color:#fff
    style General fill:#FF9800,stroke:#E65100,color:#fff
    style Random fill:#FF9800,stroke:#E65100,color:#fff
    style Dev fill:#FF9800,stroke:#E65100,color:#fff
    style Design fill:#FF9800,stroke:#E65100,color:#fff
```

## Scaling Strategy

```mermaid
graph LR
    LB["Load Balancer<br/>(Nginx)"]
    
    LB -->|Round Robin| API1["Backend<br/>Instance 1"]
    LB -->|Round Robin| API2["Backend<br/>Instance 2"]
    LB -->|Round Robin| API3["Backend<br/>Instance 3"]
    
    API1 --> Cache["Redis Cluster<br/>Shared Cache"]
    API2 --> Cache
    API3 --> Cache
    
    API1 --> DB["PostgreSQL<br/>Connection Pool"]
    API2 --> DB
    API3 --> DB
    
    API1 --> MQ["Message Queue<br/>RabbitMQ/Kafka"]
    API2 --> MQ
    API3 --> MQ
    
    Cache --> Session["Session Storage"]
    Cache --> Presence["User Presence"]
    
    MQ --> Worker1["Worker 1<br/>Async Tasks"]
    MQ --> Worker2["Worker 2<br/>Async Tasks"]
    
    DB --> Replica["🔄 Replica<br/>Read-only"]
    
    style LB fill:#4CAF50,stroke:#2E7D32,color:#fff
    style API1 fill:#2196F3,stroke:#1565C0,color:#fff
    style API2 fill:#2196F3,stroke:#1565C0,color:#fff
    style API3 fill:#2196F3,stroke:#1565C0,color:#fff
    style Cache fill:#FF9800,stroke:#E65100,color:#fff
    style DB fill:#7B1FA2,stroke:#4A148C,color:#fff
```

---

## Legend

| Symbol | Meaning |
|--------|---------|
| 🖥️ | Desktop/Web |
| 📱 | Mobile |
| 📦 | Package/Library |
| 🖨️ | CLI |
| 🏢 | Workspace |
| 💬 | Message |
| 📎 | File |
| 👥 | Members/Users |
| ✅ | Success |
| 🔄 | Refresh/Reload |
| 🚀 | Production |
| 📊 | Monitoring |

---

Last Updated: April 2024
For more details, see [Architecture Overview](./architecture.md)
