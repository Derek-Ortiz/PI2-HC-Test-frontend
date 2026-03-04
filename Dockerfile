FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build   # <- este paso genera la carpeta .next

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Estos archivos solo existen si el build fue exitoso
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
# El servidor Next.js en standalone se ejecuta con node server.js
# Este archivo está en la raíz de /app después de COPY --from=builder /app/.next/standalone ./
CMD ["node", "server.js"]