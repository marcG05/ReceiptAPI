# --- STAGE 1: Builder ---
FROM node:20-alpine AS builder

WORKDIR /app

# 1. Install dependencies first (for better caching)
COPY package*.json ./
RUN npm ci

# 2. Copy source and build
COPY . .
RUN npm run build

# --- STAGE 2: Production Runtime ---
FROM node:20-alpine AS production

WORKDIR /app

RUN apk add --no-cache tzdata
ENV TZ=America/New_York

# 3. Only install production dependencies (no devDependencies/TypeScript)
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# 4. Copy ONLY the compiled code from the builder stage
COPY --from=builder /app/dist ./dist

# Use a non-root user for security
USER node

EXPOSE 3000
CMD ["node", "dist/main"]
