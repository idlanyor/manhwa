# KanataToon - Manhwa/Comic Reader Platform

A modern web application for reading manhwa/comics built with React, Vite, and featuring a comprehensive visitor statistics system.

## Features

- Browse comics by categories (Home, Terbaru, Trending, Pustaka)
- Read comics with smooth navigation
- Dark/Light theme support
- **Visitor Statistics Dashboard** with real-time analytics
- Responsive design for mobile and desktop
- Fast performance with Vite

## Tech Stack

### Frontend
- React 19
- React Router DOM
- Tailwind CSS
- Recharts (for data visualization)
- Axios
- FontAwesome Icons

### Backend
- Hono (Lightweight web framework)
- Better SQLite3 (Database)
- Node.js

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Rhakelino/kanata-toon-2.0.git
cd kanata-toon-2.0
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
cp .env.example .env
```

4. Run the application

**Option 1: Run frontend and backend together**
```bash
npm run dev:all
```

**Option 2: Run separately**

Terminal 1 - Backend:
```bash
npm run server
```

Terminal 2 - Frontend:
```bash
npm run dev
```

5. Open your browser
- Frontend: http://localhost:5173
- Statistics API: http://localhost:8062
- Statistics Dashboard: http://localhost:5173/statistics

## Docker Setup

Run the application using Docker for easy deployment:

### Quick Start with Docker

```bash
# Start containers
./docker-manage.sh start

# Or using docker-compose directly
docker-compose up -d
```

Access the application:
- Frontend: http://localhost:8072
- Backend API: http://localhost:8062

### Docker Management Commands

```bash
./docker-manage.sh start     # Start containers
./docker-manage.sh stop      # Stop containers
./docker-manage.sh restart   # Restart containers
./docker-manage.sh rebuild   # Rebuild and restart
./docker-manage.sh logs      # View logs
./docker-manage.sh status    # Check status
./docker-manage.sh backup    # Backup database
./docker-manage.sh health    # Check API health
```

For detailed Docker documentation, see [DOCKER_README.md](./DOCKER_README.md)

## Statistics Feature

The application includes a comprehensive visitor statistics system that tracks:

- **Total Views** - All-time page views
- **Daily Views** - Views per day with 30-day trend
- **Hourly Views** - Hourly breakdown for today
- **Popular Pages** - Most visited pages
- **Recent Activity** - Real-time visitor activity

### How It Works

1. Every page navigation is automatically tracked
2. Data is stored in a local SQLite database
3. Statistics are visualized in beautiful charts
4. No personal data is collected - privacy-friendly

For detailed documentation about the statistics feature, see [STATISTICS_GUIDE.md](./STATISTICS_GUIDE.md)

## Available Scripts

- `npm run dev` - Start frontend development server
- `npm run server` - Start backend statistics API server
- `npm run dev:all` - Start both frontend and backend
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

---

## Live Deployment

### Vercel

Host your own instance of <a href="https://kanata-toon-2-0.vercel.app">juju-otaku2.0</a>  on vercel

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SankaVollereii/kanata-toon-2.0)

---

### 💻 Source Code

Source code: **[https://github.com/Rhakelino/kanata-toon-2.0](https://github.com/Rhakelino/kanata-toon-2.0)**

Api Comic: **[https://www.sankavollerei.com/comic](https://www.sankavollerei.com/comic)**

---
