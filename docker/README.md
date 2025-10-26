# Deployment Guide

This guide explains how to containerize and deploy the GH-TAP application using Docker.

## Overview

The GH-TAP application can be deployed in two different ways:

1. **Separate Containers** - Backend and frontend in separate containers (recommended for production)
2. **Combined Container** - Single container with both backend and frontend (for simple deployments)

## Prerequisites

- Docker and Docker Compose installed
- At least 2GB RAM available for containers
- Ports 80 and 8000 available

## Quick Start

### Using the Docker Manager Script

The included `docker-manager.sh` script simplifies container management:

```bash
# Navigate to the docker directory
cd docker

# Make the script executable
chmod +x docker-manager.sh

# Build all images
./docker-manager.sh build-all

# Start production environment (separate containers)
./docker-manager.sh prod

# Start combined container
./docker-manager.sh combined

# Check health status
./docker-manager.sh health

# View logs
./docker-manager.sh logs

# Stop all containers
./docker-manager.sh stop

# Clean up everything
./docker-manager.sh clean
```

## Deployment Options

### 1. Production Deployment (Separate Containers)

Best for production environments where you need independent scaling:

```bash
# Navigate to docker directory and build and start
cd docker
docker-compose up -d

# Or using the manager script
cd docker
./docker-manager.sh prod
```

**Access:**

- Frontend: http://localhost
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

### 2. Combined Container

Single container deployment for simple scenarios:

```bash
# Navigate to docker directory and build and start combined container
cd docker
docker-compose -f docker-compose.combined.yml up -d

# Or using the manager script
cd docker
./docker-manager.sh combined
```

**Access:**

- Application: http://localhost (both frontend and backend through nginx)

## Manual Docker Commands

### Building Images

```bash
# From project root:
# Backend only
docker build -t gh-tap-backend ./backend

# Frontend only
docker build -t gh-tap-frontend ./frontend

# Combined image
docker build -t gh-tap-combined -f docker/Dockerfile.combined .
```

### Running Individual Containers

```bash
# Backend container
docker run -d \
  --name gh-tap-backend \
  -p 8000:8000 \
  -e PYTHONPATH=/app/src \
  gh-tap-backend

# Frontend container
docker run -d \
  --name gh-tap-frontend \
  -p 80:80 \
  gh-tap-frontend

# Combined container
docker run -d \
  --name gh-tap-combined \
  -p 80:80 \
  -e PYTHONPATH=/app/backend/src \
  gh-tap-combined
```

## Configuration

### Environment Variables

**Backend:**

- `PYTHONPATH=/app/src` - Required for Python module imports
- Additional environment variables can be set in `docker-compose.yml`

**Frontend:**

- Build-time configuration through Vite
- Runtime configuration through nginx

### Networking

The containers use a custom bridge network (`gh-tap-network`) for inter-service communication:

- Backend is accessible to frontend as `backend:8000`
- Frontend proxies API requests to backend
- External access through exposed ports

### Health Checks

All containers include health checks:

```bash
# Check container health
docker ps
# Look for "healthy" status

# Manual health check
curl http://localhost:8000/health  # Backend
curl http://localhost/            # Frontend
```

## Production Considerations

### Security

1. **Non-root User**: Backend container runs as non-root user
2. **Security Headers**: Nginx includes security headers
3. **CORS**: Properly configured for your domain
4. **Secrets**: Use Docker secrets or environment files for sensitive data

### Performance

1. **Multi-stage Builds**: Optimized image sizes
2. **Nginx Caching**: Static assets cached for 1 year
3. **Gzip Compression**: Enabled for text-based assets
4. **Resource Limits**: Consider adding memory/CPU limits in production

### Monitoring

```bash
# Container stats
docker stats

# Container logs (from docker directory)
cd docker
docker-compose logs -f

# Health monitoring (from docker directory)
cd docker
./docker-manager.sh health
```

### Scaling

For horizontal scaling:

```bash
# Scale backend instances (from docker directory)
cd docker
docker-compose up -d --scale backend=3

# Add load balancer (nginx/traefik) in front of multiple backend instances
```

## Troubleshooting

### Common Issues

1. **Port Conflicts**

   ```bash
   # Check what's using the port
   lsof -i :8000
   # Stop conflicting services or change ports
   ```

2. **Build Failures**

   ```bash
   # Clean build without cache (from docker directory)
   cd docker
   ./docker-manager.sh build-all --no-cache
   ```

3. **Container Won't Start**

   ```bash
   # Check logs (from docker directory)
   cd docker
   docker-compose logs [service-name]
   ```

4. **API Connection Issues**
   - Verify backend is running: `curl http://localhost:8000/health`
   - Check nginx proxy configuration in combined deployment
   - Ensure CORS settings allow your frontend domain

### Debugging

```bash
# Enter running container
docker exec -it gh-tap-backend bash
docker exec -it gh-tap-frontend sh

# View real-time logs (from docker directory)
cd docker
docker-compose logs -f

# Inspect container configuration
docker inspect gh-tap-backend
```
