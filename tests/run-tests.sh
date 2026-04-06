#!/bin/bash

# Emergent Backend Tests

echo "Running backend tests..."
cd backend

# Run lint
npm run lint

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e

echo "Backend tests completed!"
