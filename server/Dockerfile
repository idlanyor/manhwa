# Backend Dockerfile untuk Hono API Server
FROM node:20-alpine

WORKDIR /app

# Install dependencies yang diperlukan untuk better-sqlite3
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package.json ./
COPY package-lock.json* ./

# Install dependencies
RUN npm install --production

# Copy server files
COPY server/ ./server/

# Create directory for database dengan permissions yang tepat
RUN mkdir -p /app/data && chmod 777 /app/data

# Expose port untuk API server
EXPOSE 8062

# Set working directory ke root app
WORKDIR /app

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8062/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start server
CMD ["node", "server/index.js"]
