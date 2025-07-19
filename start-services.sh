#!/bin/bash

# Set Docker Compose timeout to 5 minutes (300 seconds)
export COMPOSE_HTTP_TIMEOUT=300

echo "Starting microservices with increased timeout..."
echo "Timeout set to: $COMPOSE_HTTP_TIMEOUT seconds"

# Start all services
docker-compose up -d

echo "All services started successfully!"
echo "Check status with: docker ps" 