# Frontend Build Stage
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY SL-Tiles-Showroom/package*.json ./
RUN npm ci
COPY SL-Tiles-Showroom/ ./
RUN npm run build

# Backend Build Stage
FROM node:18-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci
COPY backend/ ./
RUN npm run build

# Production Environment
FROM node:18-alpine
WORKDIR /app

# Install Nginx to serve frontend statically
RUN apk add --no-cache nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copy frontend build
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html

# Copy backend build
WORKDIR /app/backend
COPY --from=backend-builder /app/backend/dist ./dist
COPY --from=backend-builder /app/backend/node_modules ./node_modules
COPY --from=backend-builder /app/backend/package.json ./

# Start script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

EXPOSE 80 5000
CMD ["/app/start.sh"]
