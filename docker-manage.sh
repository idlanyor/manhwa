#!/bin/bash

# Docker Management Script untuk Kanata Toon
# Usage: ./docker-manage.sh [command]

set -e

# Colors./
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' 
# No Color

# Functions
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Commands
start() {
    print_info "Starting containers..."
    docker compose up -d
    print_success "Containers started!"
    print_info "Frontend: https://comic.antidonasi.web.id/"
    print_info "Backend API: https://backend-comic.antidonasi.web.id/"
}

stop() {
    print_info "Stopping containers..."
    docker compose stop
    print_success "Containers stopped!"
}

restart() {
    print_info "Restarting containers..."
    docker compose restart
    print_success "Containers restarted!"
}

build() {
    print_info "Building images..."
    docker compose build
    print_success "Build complete!"
}

rebuild() {
    print_info "Rebuilding and restarting containers..."
    docker compose up -d --build
    print_success "Rebuild complete!"
    print_info "Frontend: https://comic.antidonasi.web.id/"
    print_info "Backend API: https://backend-comic.antidonasi.web.id/"
}

logs() {
    SERVICE=${1:-""}
    if [ -z "$SERVICE" ]; then
        docker compose logs -f
    else
        docker compose logs -f "$SERVICE"
    fi
}

status() {
    print_info "Container status:"
    docker compose ps
}

clean() {
    print_info "Cleaning up containers, networks, and volumes..."
    read -p "Are you sure? This will remove all containers and volumes (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker compose down -v
        print_success "Cleanup complete!"
    else
        print_info "Cleanup cancelled"
    fi
}

backup_db() {
    BACKUP_FILE="backup-statistics-$(date +%Y%m%d-%H%M%S).db"
    print_info "Creating database backup..."
    cp ./server/statistics.db "./$BACKUP_FILE"
    print_success "Database backed up to: $BACKUP_FILE"
}

shell() {
    SERVICE=${1:-"backend"}
    print_info "Opening shell in $SERVICE container..."
    docker exec -it "kanata-toon-$SERVICE" sh
}

health() {
    print_info "Checking backend health..."
    curl -s https://comic.antidonasi.web.id | jq . || curl -s https://comic.antidonasi.web.id
}

# Main
case "${1:-}" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    restart)
        restart
        ;;
    build)
        build
        ;;
    rebuild)
        rebuild
        ;;
    logs)
        logs "${2:-}"
        ;;
    status)
        status
        ;;
    clean)
        clean
        ;;
    backup)
        backup_db
        ;;
    shell)
        shell "${2:-backend}"
        ;;
    health)
        health
        ;;
    *)
        echo "Kanata Toon - Docker Management Script"
        echo ""
        echo "Usage: $0 [command] [options]"
        echo ""
        echo "Commands:"
        echo "  start          - Start containers"
        echo "  stop           - Stop containers"
        echo "  restart        - Restart containers"
        echo "  build          - Build images"
        echo "  rebuild        - Rebuild and restart containers"
        echo "  logs [service] - View logs (backend/web)"
        echo "  status         - Show container status"
        echo "  clean          - Remove containers and volumes"
        echo "  backup         - Backup database"
        echo "  shell [service]- Open shell (backend/frontend)"
        echo "  health         - Check backend health"
        echo ""
        echo "Examples:"
        echo "  $0 start"
        echo "  $0 logs backend"
        echo "  $0 shell backend"
        ;;
esac
