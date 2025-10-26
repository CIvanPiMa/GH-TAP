#!/bin/bash

# GH-TAP Docker Management Script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  build-all          Build all Docker images"
    echo "  build-backend      Build backend image only"
    echo "  build-frontend     Build frontend image only"
    echo "  build-combined     Build combined image"
    echo "  prod               Start production environment (separate containers)"
    echo "  combined           Start combined container (auto-rebuilds if needed)"
    echo "  stop               Stop all containers"
    echo "  clean              Remove all containers and images"
    echo "  logs               Show logs from all containers"
    echo "  health             Check health status of containers"
    echo ""
    echo "Options:"
    echo "  --no-cache         Build without cache"
    echo "  --pull             Pull latest base images"
    echo "  --rebuild          Force rebuild of images (for combined command)"
    echo ""
}

# Function to build all images
build_all() {
    print_status "Building all Docker images..."

    if [[ "$*" == *"--no-cache"* ]]; then
        NO_CACHE="--no-cache"
    else
        NO_CACHE=""
    fi

    if [[ "$*" == *"--pull"* ]]; then
        PULL="--pull"
    else
        PULL=""
    fi

    print_status "Building backend image..."
    docker build $NO_CACHE $PULL -t gh-tap-backend ../backend

    print_status "Building frontend image..."
    docker build $NO_CACHE $PULL -t gh-tap-frontend ../frontend

    print_status "Building combined image..."
    docker build $NO_CACHE $PULL -t gh-tap-combined -f Dockerfile.combined ..

    print_success "All images built successfully!"
}

# Function to build backend only
build_backend() {
    print_status "Building backend image..."

    if [[ "$*" == *"--no-cache"* ]]; then
        NO_CACHE="--no-cache"
    else
        NO_CACHE=""
    fi

    docker build $NO_CACHE -t gh-tap-backend ../backend
    print_success "Backend image built successfully!"
}

# Function to build frontend only
build_frontend() {
    print_status "Building frontend image..."

    if [[ "$*" == *"--no-cache"* ]]; then
        NO_CACHE="--no-cache"
    else
        NO_CACHE=""
    fi

    docker build $NO_CACHE -t gh-tap-frontend ../frontend
    print_success "Frontend image built successfully!"
}

# Function to build combined image
build_combined() {
    print_status "Building combined image..."

    if [[ "$*" == *"--no-cache"* ]]; then
        NO_CACHE="--no-cache"
    else
        NO_CACHE=""
    fi

    docker build $NO_CACHE -t gh-tap-combined -f Dockerfile.combined ..
    print_success "Combined image built successfully!"
}

# Function to start production environment
start_prod() {
    print_status "Starting production environment..."
    docker compose up -d
    print_success "Production environment started!"
    print_status "Application: http://localhost"
    print_status "Backend API: http://localhost:8000"
}

# Function to start combined container
start_combined() {
    print_status "Starting combined container..."

    # Check if we need to rebuild (force rebuild if image doesn't exist or if --rebuild flag is passed)
    if [[ "$*" == *"--rebuild"* ]] || ! docker image inspect gh-tap-combined > /dev/null 2>&1; then
        print_status "Building/rebuilding combined image..."
        docker compose -f docker-compose.combined.yml build --no-cache
    fi

    docker compose -f docker-compose.combined.yml up -d
    print_success "Combined container started!"
    print_status "Application: http://localhost"
}

# Function to stop all containers
stop_all() {
    print_status "Stopping all containers..."
    docker compose -f docker-compose.yml down 2>/dev/null || true
    docker compose -f docker-compose.combined.yml down 2>/dev/null || true
    print_success "All containers stopped!"
}

# Function to clean up
clean_all() {
    print_warning "This will remove all GH-TAP containers and images!"
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Cleaning up..."
        stop_all
        docker rmi gh-tap-backend gh-tap-frontend gh-tap-combined 2>/dev/null || true
        docker system prune -f
        print_success "Cleanup completed!"
    else
        print_status "Cleanup cancelled."
    fi
}

# Function to show logs
show_logs() {
    print_status "Showing logs from all containers..."
    if docker compose ps -q > /dev/null 2>&1; then
        docker compose logs -f
    elif docker compose -f docker-compose.combined.yml ps -q > /dev/null 2>&1; then
        docker compose -f docker-compose.combined.yml logs -f
    else
        print_error "No running containers found!"
        exit 1
    fi
}

# Function to check health
check_health() {
    print_status "Checking container health..."

    # Check if any containers are running
    RUNNING_CONTAINERS=$(docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep -E "(gh-tap|frontend|backend)" || true)

    if [ -z "$RUNNING_CONTAINERS" ]; then
        print_warning "No GH-TAP containers are currently running."
        exit 0
    fi

    echo "$RUNNING_CONTAINERS"

    # Test endpoints if containers are running
    print_status "Testing endpoints..."

    # Test backend health (through nginx proxy in combined deployment)
    if curl -f http://localhost/api/v1/ > /dev/null 2>&1; then
        print_success "Backend health check: OK"
    else
        # Fallback to direct backend port for separate container deployment
        if curl -f http://localhost:8000/health > /dev/null 2>&1; then
            print_success "Backend health check: OK"
        else
            print_error "Backend health check: FAILED"
        fi
    fi

    # Test frontend
    if curl -f http://localhost > /dev/null 2>&1; then
        print_success "Frontend health check: OK"
    else
        print_error "Frontend health check: FAILED"
    fi
}

# Main script logic
case "${1:-}" in
    "build-all")
        build_all "${@:2}"
        ;;
    "build-backend")
        build_backend "${@:2}"
        ;;
    "build-frontend")
        build_frontend "${@:2}"
        ;;
    "build-combined")
        build_combined "${@:2}"
        ;;
    "prod")
        start_prod
        ;;
    "combined")
        start_combined "${@:2}"
        ;;
    "stop")
        stop_all
        ;;
    "clean")
        clean_all
        ;;
    "logs")
        show_logs
        ;;
    "health")
        check_health
        ;;
    "help"|"--help"|"-h")
        show_usage
        ;;
    *)
        print_error "Unknown command: ${1:-}"
        echo ""
        show_usage
        exit 1
        ;;
esac
