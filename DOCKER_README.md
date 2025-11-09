# Docker Setup Guide - Kanata Toon

Panduan untuk menjalankan aplikasi Kanata Toon menggunakan Docker.

## 📦 Struktur Service

Aplikasi ini terdiri dari 2 service:

1. **Frontend** (web) - React/Vite app dengan Nginx
   - Port: 8072
   - Container: kanata-toon-frontend

2. **Backend** (backend) - Hono API Server dengan SQLite
   - Port: 8062
   - Container: kanata-toon-backend
   - Database: SQLite (statistics.db)

## 🚀 Quick Start

### 1. Setup Environment Variables

Copy file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Edit `.env` sesuai kebutuhan:

```env
# API Configuration
VITE_API_URL=http://localhost:8062

# Server Configuration
PORT=8062
```

### 2. Build dan Jalankan dengan Docker Compose

```bash
# Build images
docker-compose build

# Jalankan containers
docker-compose up -d

# Atau build dan run sekaligus
docker-compose up -d --build
```

### 3. Akses Aplikasi

- **Frontend**: http://localhost:8072
- **Backend API**: http://localhost:8062/api/health

## 🛠️ Perintah Docker Compose

### Menjalankan Containers

```bash
# Run di background
docker-compose up -d

# Run dengan logs
docker-compose up

# Run dan rebuild
docker-compose up -d --build
```

### Melihat Status

```bash
# List running containers
docker-compose ps

# Lihat logs
docker-compose logs

# Lihat logs specific service
docker-compose logs backend
docker-compose logs web

# Follow logs real-time
docker-compose logs -f backend
```

### Stop dan Remove

```bash
# Stop containers
docker-compose stop

# Stop dan remove containers
docker-compose down

# Stop, remove containers, networks, dan volumes
docker-compose down -v
```

### Restart Services

```bash
# Restart semua services
docker-compose restart

# Restart specific service
docker-compose restart backend
docker-compose restart web
```

## 🔍 Troubleshooting

### Check Health Status

```bash
# Check backend health
curl http://localhost:8062/api/health

# Check container health
docker-compose ps
```

### View Container Logs

```bash
# Backend logs
docker-compose logs -f backend

# Frontend logs
docker-compose logs -f web
```

### Rebuild Specific Service

```bash
# Rebuild backend only
docker-compose build backend
docker-compose up -d backend

# Rebuild frontend only
docker-compose build web
docker-compose up -d web
```

### Access Container Shell

```bash
# Backend shell
docker exec -it kanata-toon-backend sh

# Frontend shell
docker exec -it kanata-toon-frontend sh
```

## 💾 Database Persistence

Database SQLite (`statistics.db`) dipersist menggunakan:
1. Volume bind mount: `./server/statistics.db:/app/server/statistics.db`
2. Named volume: `backend-data:/app/server`

Data tidak akan hilang saat container di-restart atau rebuild.

### Backup Database

```bash
# Copy database dari container
docker cp kanata-toon-backend:/app/server/statistics.db ./backup-statistics.db

# Atau langsung dari host (karena di-mount)
cp ./server/statistics.db ./backup-statistics.db
```

### Restore Database

```bash
# Copy database ke container
docker cp ./backup-statistics.db kanata-toon-backend:/app/server/statistics.db

# Restart backend
docker-compose restart backend
```

## 🌐 Production Deployment

### Update CORS Configuration

Edit `server/index.js` untuk menambahkan production domain:

```javascript
app.use('/*', cors({
  origin: [
    'http://localhost:8072',
    'https://yourdomain.com'
  ],
  credentials: true,
}));
```

### Update Environment Variables

Sesuaikan `.env` untuk production:

```env
VITE_API_URL=https://api.yourdomain.com
PORT=8062
NODE_ENV=production
```

### Reverse Proxy (Nginx/Caddy)

Contoh konfigurasi Nginx:

```nginx
# Frontend
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:8072;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# Backend API
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:8062;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 📊 Monitoring

### Check Container Resources

```bash
# View container stats
docker stats kanata-toon-backend kanata-toon-frontend

# View detailed info
docker inspect kanata-toon-backend
```

### API Health Check

Backend memiliki built-in health check endpoint:

```bash
curl http://localhost:8062/api/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2025-11-07T..."
}
```

## 🔧 Development Mode

Untuk development tanpa Docker:

```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run dev

# Atau jalankan keduanya sekaligus
npm run dev:all
```

## 📝 Notes

- Frontend rebuild akan lebih lama karena menggunakan multi-stage build
- Backend restart lebih cepat karena hanya menjalankan Node.js
- Database SQLite cocok untuk small-to-medium traffic
- Untuk high traffic, pertimbangkan migrasi ke PostgreSQL/MySQL
