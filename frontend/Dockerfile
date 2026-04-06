FROM node:20-alpine AS builder

WORKDIR /app

# Copy frontend files
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY frontend/ ./frontend/

# Install dependencies
RUN npm ci && cd frontend && npm ci

# Build frontend
RUN cd frontend && npm run build

# Runtime stage
FROM nginx:alpine

# Copy nginx configuration
COPY infra/nginx.conf /etc/nginx/nginx.conf

# Copy built application
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

EXPOSE 3000 5173

CMD ["nginx", "-g", "daemon off;"]
