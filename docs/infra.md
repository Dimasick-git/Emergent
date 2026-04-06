# Infrastructure & Deployment

## Docker Compose

Complete multi-container setup for local development and production.

### Services

1. **PostgreSQL** - Database
2. **Redis** - Cache and real-time
3. **MinIO** - S3-compatible storage
4. **Backend** - NestJS API
5. **Frontend** - React app
6. **Nginx** - Reverse proxy

### Start Services

```bash
# Build images
docker-compose build

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Service Endpoints

| Service | URL | Port |
|---------|-----|------|
| Frontend | http://localhost:3000 | 3000 |
| Backend | http://localhost:3001 | 3001 |
| API Docs | http://localhost:3001/api/docs | 3001 |
| PostgreSQL | localhost:5432 | 5432 |
| Redis | localhost:6379 | 6379 |
| MinIO | http://localhost:9000 | 9000 |
| MinIO Console | http://localhost:9001 | 9001 |
| Nginx | http://localhost:8080 | 8080 |

## Environment Configuration

Create `.env` from template:

```bash
cp .env.example .env
```

### Key Variables

```env
# Database
DATABASE_URL=postgresql://emergent:emergent@postgres:5432/emergent

# Redis
REDIS_URL=redis://redis:6379

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=24h

# MinIO
MINIO_ENDPOINT=minio:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin

# API
PORT=3001
CORS_ORIGIN=http://localhost:3000
```

## Nginx Configuration

### Reverse Proxy

- `http://localhost:8080/api` → Backend
- `http://localhost:8080/ws` → WebSocket
- `http://localhost:8080/` → Frontend
- `http://localhost:8080/minio/` → MinIO

### SSL/TLS

For production, configure SSL certificates:

```nginx
server {
    listen 443 ssl;
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # ... rest of config
}
```

## Database Backup

### Backup

```bash
docker exec emergent-postgres pg_dump -U emergent emergent > backup.sql
```

### Restore

```bash
docker exec -i emergent-postgres psql -U emergent emergent < backup.sql
```

## MinIO Management

### Create Bucket

```bash
docker exec emergent-minio mc mb minio/emergent-files
```

### List Buckets

```bash
docker exec emergent-minio mc ls minio/
```

### Access Console

- URL: http://localhost:9001
- Username: minioadmin
- Password: minioadmin

## GitHub Actions Deployment

### CI/CD Workflows

1. **CI** (ci.yml) - Lint, test, build
2. **CD** (cd.yml) - Build Docker images
3. **Pages** (pages.yml) - Deploy frontend
4. **Docs** (docs.yml) - Deploy documentation

### Secrets Configuration

Set in GitHub repository settings:

```
DOCKERHUB_USERNAME = your-username
DOCKERHUB_TOKEN = your-token
```

## Production Deployment

### Using Docker Swarm

```bash
docker swarm init
docker stack deploy -c docker-compose.yml emergent
```

### Using Kubernetes

```bash
kubectl apply -f k8s/
```

### Cloud Platforms

#### Railway

```bash
railway up
```

#### Render

```bash
render deploy
```

#### DigitalOcean App Platform

```bash
# Configure via web interface
# Push to GitHub and auto-deploy
```

## Health Checks

### Backend Health

```bash
curl http://localhost:3001/api/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-04-06T...",
  "version": "0.1.0"
}
```

### Database Health

```bash
docker exec emergent-postgres pg_isready -U emergent
```

### Redis Health

```bash
docker exec emergent-redis redis-cli ping
```

## Monitoring

### Container Stats

```bash
docker stats emergent-backend emergent-frontend emergent-postgres
```

### Logs

```bash
# Backend logs
docker logs -f emergent-backend

# Database logs
docker logs -f emergent-postgres

# All services
docker-compose logs -f
```

## Scaling

### Horizontal Scaling

#### Multiple Backend Instances

```yaml
backend-1:
  # ... config

backend-2:
  # ... config

nginx:
  # Configure load balancing
```

#### Database Replication

```sql
-- Setup primary-replica replication
-- See PostgreSQL documentation
```

## Security Best Practices

1. **Secrets** - Use environment variables, never commit secrets
2. **SSL/TLS** - Enable HTTPS in production
3. **Firewall** - Restrict port access
4. **Updates** - Keep dependencies updated
5. **Backups** - Regular database backups
6. **Monitoring** - Monitor for unusual activity

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker logs emergent-backend

# Verify image
docker images

# Remove and rebuild
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

### Database Connection Error

```bash
# Check PostgreSQL status
docker exec emergent-postgres pg_isready

# Verify environment variables
env | grep DATABASE_URL

# Test connection
docker exec emergent-backend npm run prisma:studio
```

### High Memory Usage

```bash
# Check container memory
docker stats emergent-backend

# Increase limits in docker-compose.yml
services:
  backend:
    deploy:
      resources:
        limits:
          memory: 1G
```

## Maintenance

### Update Dependencies

```bash
npm update
npm audit fix
```

### Database Migrations

```bash
# Run pending migrations
npm run prisma:migrate deploy

# Check migration status
npm run prisma:migrate status
```

### Clean Up

```bash
# Remove unused images
docker image prune

# Remove unused volumes
docker volume prune

# Remove unused networks
docker network prune
```
