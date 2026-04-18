# ── Build Stage ──
FROM    node:22-alpine AS build

WORKDIR /app
COPY    package*.json ./
RUN     npm ci --production=false
COPY    . .
RUN     npm run build

# ── Production Stage ──
FROM    nginx:alpine

# Remove default nginx config and add ours
RUN     rm /etc/nginx/conf.d/default.conf
COPY    nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static assets
COPY    --from=build /app/dist /usr/share/nginx/html

EXPOSE  8080

# Run nginx in foreground (required for Cloud Run)
CMD     ["nginx", "-g", "daemon off;"]
