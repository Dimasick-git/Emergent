#!/bin/bash

# Stop all services

echo "🛑 Stopping Emergent services..."

docker-compose down

echo "✅ Services stopped"
