# Backend Guide

## Architecture

### Modules

The backend is organized into logical modules:

1. **Auth Module** - Authentication and JWT
2. **Users Module** - User management
3. **Workspaces Module** - Workspace operations
4. **Channels Module** - Channel management
5. **Messages Module** - Message operations
6. **Files Module** - File upload/download
7. **Gateway Module** - WebSocket communication
8. **Health Module** - Health checks

### Project Structure

```
backend/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── workspaces/
│   │   ├── channels/
│   │   ├── messages/
│   │   ├── files/
│   │   ├── gateway/
│   │   ├── health/
│   │   └── prisma/
│   ├── guards/
│   ├── interceptors/
│   ├── pipes/
│   ├── decorators/
│   ├── common/
│   ├── config/
│   ├── filters/
│   ├── decorators/
│   ├── app.module.ts
│   └── main.ts
├── prisma/
│   └── schema.prisma
└── test/
```

## Development

### Setup

```bash
cd backend
npm install
cp .env.example .env
npm run prisma:migrate dev
npm run dev
```

### Database

#### Migrations

```bash
# Create new migration
npm run prisma:migrate dev --name add_new_field

# Apply migrations
npm run prisma:migrate deploy

# Reset database
npm run prisma:migrate reset

# View database
npm run prisma:studio
```

#### Prisma Client

```typescript
import { PrismaService } from '../prisma/prisma.service';

constructor(private prisma: PrismaService) {}

// Usage
const user = await this.prisma.user.findUnique({
  where: { id },
});
```

## Authentication

### JWT Strategy

```typescript
// JWT payload
{
  sub: string (userId)
  email: string
  username: string
  iat: number
  exp: number
}
```

### Usage

```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Get(':id')
async getUser(@Param('id') id: string) {
  return this.usersService.getUserById(id);
}
```

## WebSocket Gateway

### Events

#### Subscribe to Channel

```javascript
ws.emit('channel:subscribe', { channelId: 'id' });
```

#### Receive Events

```javascript
ws.on('message:created', (data) => {
  console.log('New message:', data);
});

ws.on('user:online', (data) => {
  console.log('User online:', data.userId);
});

ws.on('user:typing', (data) => {
  console.log('User typing:', data.userId);
});
```

## Services

### Creating Services

```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MyService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateDto) {
    return this.prisma.myTable.create({ data });
  }

  async findById(id: string) {
    return this.prisma.myTable.findUnique({ where: { id } });
  }
}
```

### Controllers

```typescript
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('my-route')
export class MyController {
  constructor(private service: MyService) {}

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Post()
  async create(@Body() dto: CreateDto) {
    return this.service.create(dto);
  }
}
```

## Testing

### Unit Tests

```bash
npm run test
```

### E2E Tests

```bash
npm run test:e2e
```

### Coverage

```bash
npm run test:cov
```

## Error Handling

### Exception Filters

```typescript
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    
    response.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
}
```

## Performance

### Database Optimization

1. **Indexes** - Add indexes to frequently queried columns
2. **Pagination** - Use skip/take for large datasets
3. **Projections** - Select only needed fields
4. **Caching** - Use Redis for frequent queries

### Query Optimization

```typescript
// Bad: N+1 query problem
const users = await this.prisma.user.findMany();
for (const user of users) {
  const workspaces = await this.prisma.workspace.findMany({
    where: { members: { some: { userId: user.id } } },
  });
}

// Good: Load relations
const users = await this.prisma.user.findMany({
  include: { workspaces: true },
});
```

## Deployment

### Environment Variables

```bash
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your-secret
MINIO_ENDPOINT=storage.example.com
```

### Docker

```bash
docker build -t emergent-backend .
docker run -p 3001:3001 emergent-backend
```

## Monitoring

### Health Checks

```bash
curl http://localhost:3001/api/health
```

### Logs

```bash
# File logging
tail -f logs/app.log

# Docker logs
docker logs emergent-backend
```

## Security

1. **CORS** - Configure allowed origins
2. **Rate Limiting** - Implement per-IP limits
3. **Input Validation** - Use validation pipes
4. **SQL Injection** - Use Prisma ORM
5. **Auth** - Implement JWT with expiration
6. **HTTPS** - Use in production

## Troubleshooting

### Database Connection Issues

```bash
# Check connection string
echo $DATABASE_URL

# Test connection
npm run prisma:studio
```

### JWT Token Errors

```bash
# Verify token signature
# Check token expiration
# Verify secret matches

const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log(decoded);
```

### Performance Issues

```bash
# Enable query logging
npm run prisma:studio

# Check slow queries
SELECT query, mean_time FROM pg_stat_statements WHERE mean_time > 100;
```
