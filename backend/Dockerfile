# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Install openssl for Prisma
RUN apk add --no-cache openssl

# Run as non-root user for security
RUN chown -R node:node /app
USER node

# Copy production dependencies definition and Prisma schema
COPY --chown=node:node package*.json ./
COPY --chown=node:node prisma ./prisma/

# Install only production dependencies
RUN npm ci --only=production && \
    npx prisma generate

# Copy built app from build stage
COPY --chown=node:node --from=build /app/dist ./dist

EXPOSE 5000

# Prisma db push or migrate deploy should ideally be run before start in a production pipeline
# But for a simple compose setup, we can run migration and then start
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
