# Deployment Guide

Complete guide for deploying Emergent to production environments.

## 🏗️ Pre-Deployment Checklist

- [ ] Database backups enabled
- [ ] Environment variables configured securely
- [ ] SSL/TLS certificates obtained
- [ ] DNS records configured
- [ ] Firewall rules configured
- [ ] Health checks verified
- [ ] Monitoring alerts set up
- [ ] Disaster recovery plan documented
- [ ] Load testing completed
- [ ] Security audit passed

## 🌐 Cloud Deployment Options

### Option 1: Railway (⭐ Recommended for Getting Started)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   railway login
   ```

3. **Deploy**
   ```bash
   railway init
   railway add
   railway up
   ```

4. **Configure Services**
   - Add PostgreSQL plugin
   - Add Redis plugin
   - Set environment variables

### Option 2: DigitalOcean App Platform

1. **Create App Spec** (`app.yaml`)
   ```yaml
   name: emergent
   services:
   - name: backend
     github:
       repo: Dimasick-git/Emergent
       branch: main
     build_command: cd backend && npm install && npm run build
     run_command: npm run start
     http_port: 3001
     envs:
     - key: NODE_ENV
       value: production
   ```

2. **Deploy**
   ```bash
   doctl apps create --spec app.yaml
   ```

### Option 3: AWS (ECS with CloudFormation)

1. **Build Docker images**
   ```bash
   docker build -t emergent-backend ./backend
   docker build -t emergent-frontend ./frontend
   ```

2. **Push to ECR**
   ```bash
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account>.dkr.ecr.us-east-1.amazonaws.com
   docker tag emergent-backend <account>.dkr.ecr.us-east-1.amazonaws.com/emergent-backend:latest
   docker push <account>.dkr.ecr.us-east-1.amazonaws.com/emergent-backend:latest
   ```

3. **Deploy with CloudFormation**
   ```bash
   aws cloudformation deploy --template-file infra/cloudformation.yaml --stack-name emergent-prod
   ```

### Option 4: Google Cloud Platform (Cloud Run)

1. **Build and push**
   ```bash
   gcloud builds submit --tag gcr.io/PROJECT_ID/emergent-backend
   gcloud builds submit --tag gcr.io/PROJECT_ID/emergent-frontend
   ```

2. **Deploy**
   ```bash
   gcloud run deploy emergent-backend \
     --image gcr.io/PROJECT_ID/emergent-backend:latest \
     --platform managed \
     --region us-central1
   ```

### Option 5: Self-Hosted (VPS/Dedicated Server)

1. **SSH into server**
   ```bash
   ssh root@your-server.com
   ```

2. **Install Docker**
   ```bash
   curl -sSL https://get.docker.com | sh
   ```

3. **Clone and deploy**
   ```bash
   git clone https://github.com/Dimasick-git/Emergent.git
   cd Emergent
   cp .env.example .env
   # Edit .env with production values
   docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
   ```

## 🔒 Security Configuration

### HTTPS/SSL

**Using Let's Encrypt + Nginx:**

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --nginx -d emergent.example.com

# Update nginx.conf
ssl_certificate /etc/letsencrypt/live/emergent.example.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/emergent.example.com/privatekey.pem;

# Auto-renewal
sudo apt-get install certbot-auto
sudo certbot renew --dry-run
```

### Environment Variables

```bash
# Generate strong JWT secret
openssl rand -base64 32

# Set in .env
JWT_SECRET=<output-from-above>
DATABASE_URL=postgresql://user:strong-password@db-server:5432/emergent
```

### Firewall Rules

```bash
# UFW (Ubuntu)
sudo ufw allow 22/tcp      # SSH
sudo ufw allow 80/tcp      # HTTP
sudo ufw allow 443/tcp     # HTTPS
sudo ufw enable
```

### Database Security

```bash
# Backup database
docker-compose exec -T postgres pg_dump -U postgres emergent | gzip > backup-$(date +%Y%m%d).sql.gz

# Schedule daily backups (crontab)
0 2 * * * cd /path/to/Emergent && docker-compose exec -T postgres pg_dump -U postgres emergent | gzip > /backups/emergent-$(date +\%Y\%m\%d).sql.gz
```

## 📊 Monitoring & Logging

### Health Checks

```bash
# Check backend health
curl http://localhost:3001/api/health

# Response:
# {
#   "status": "ok",
#   "timestamp": "2024-04-06T00:00:00Z",
#   "version": "0.1.0"
# }
```

### Logging

```bash
# View Docker logs
docker-compose logs -f

# Export logs to file
docker-compose logs > logs.txt

# View specific service
docker-compose logs -f backend
```

### Monitoring Stack

Set up monitoring with Prometheus + Grafana:

```yaml
# docker-compose.monitoring.yml
version: '3.8'
services:
  prometheus:
    image: prom/prometheus
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"
  
  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
```

## 🚀 Scaling Strategy

### Database Scaling

```sql
-- Read replicas
CREATE DATABASE emergent_replica
  WITH
  TEMPLATE emergent
  REPLICATION ROLE replica;

-- Replication user
CREATE USER replication_user WITH REPLICATION;
```

### Backend Scaling

```yaml
# docker-compose.prod.yml
services:
  backend:
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
```

### Load Balancing

```nginx
# nginx.conf
upstream backend {
  least_conn;
  server backend-1:3001;
  server backend-2:3001;
  server backend-3:3001;
}

server {
  listen 80;
  location /api {
    proxy_pass http://backend;
  }
}
```

## 📈 Performance Optimization

### Frontend

```bash
# Generate size analysis
npm run build -- --analyze

# Requires: npm install -D webpack-bundle-analyzer
```

### Backend

```bash
# Enable query caching in Prisma
const data = await prisma.user.findMany({
  select: { id: true, email: true }
});
```

### Database

```sql
-- Create indexes for frequently queried fields
CREATE INDEX idx_messages_channel_id ON messages(channel_id);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX idx_channel_members_user_id ON channel_members(user_id);
```

### Redis Caching

```typescript
// Example: Cache user data
const cacheKey = `user:${userId}`;
let user = await redis.get(cacheKey);

if (!user) {
  user = await db.user.findUnique({ where: { id: userId } });
  await redis.set(cacheKey, user, 'EX', 3600);
}
```

## 🔄 Continuous Deployment

### GitHub Actions

The project includes 4 workflows:

1. **CI** (`.github/workflows/ci.yml`)
   - Lint
   - Test
   - Build

2. **CD** (`.github/workflows/cd.yml`)
   - Build Docker images
   - Push to registry
   - Deploy to staging

3. **Pages** (`.github/workflows/pages.yml`)
   - Build frontend
   - Deploy to GitHub Pages

4. **Docs** (`.github/workflows/docs.yml`)
   - Build documentation
   - Deploy docs website

### Manual Deployment

```bash
# Tag release
git tag -a v0.1.0 -m "Release version 0.1.0"
git push origin v0.1.0

# GitHub Actions automatically builds and deploys on tag push
```

## 🆘 Disaster Recovery

### Database Restoration

```bash
# Restore from backup
docker-compose exec -T postgres psql -U postgres emergent < backup.sql

# Or from gzipped backup
gunzip -c backup.sql.gz | docker-compose exec -T postgres psql -U postgres emergent
```

### Service Restoration

```bash
# If backend crashes, restart it
docker-compose restart backend

# If frontend crashes, restart it
docker-compose restart frontend

# Full service recovery
docker-compose down
docker-compose up --build
```

## 📋 Deployment Checklist

Before going live:

- [ ] SSL certificate configured
- [ ] All environment variables set
- [ ] Database migrations applied
- [ ] Database backups working
- [ ] Health checks passing
- [ ] Monitoring alerts configured
- [ ] Firewall rules in place
- [ ] DNS records updated
- [ ] Performance tested
- [ ] Security scan passed
- [ ] Team notified
- [ ] Rollback plan documented

## 📚 Additional Resources

- [Docker Compose Docs](https://docs.docker.com/compose/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [PostgreSQL Administration](https://www.postgresql.org/docs/current/admin.html)
- [Redis Operations](https://redis.io/documentation)
- [NestJS Production](https://docs.nestjs.com/deployment)

---

Last Updated: April 2024
For more help, see [Infrastructure Guide](./infra.md)
