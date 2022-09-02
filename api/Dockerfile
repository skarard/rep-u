# Rebuild the source code only when needed
FROM node:16 AS builder
RUN apt-get update
RUN apt-get install -y libsecret-1-0
WORKDIR /app
COPY . .

ARG target_env=production

RUN if [ "$target_env" = "local" ] ; then cp .env.local .env ; fi
RUN npm ci
RUN npm run build
RUN npm ci --production

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/.env ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 8080

CMD ["npm", "start"]
