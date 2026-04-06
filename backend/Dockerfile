FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY prisma ./prisma/

# Install dependencies
RUN npm ci && cd backend && npm ci

# Build backend
RUN cd backend && npm run build

# Runtime stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY backend/package*.json ./backend/

# Install production dependencies
RUN npm ci --production && cd backend && npm ci --production

# Copy prisma files
COPY backend/prisma ./backend/prisma/
COPY backend/src ./backend/src/

# Copy built application
COPY --from=builder /app/backend/dist ./backend/dist/

# Generate Prisma client
RUN cd backend && npm run prisma:generate

EXPOSE 3001

CMD ["cd backend && npm start"]
