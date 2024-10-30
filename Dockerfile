FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

FROM node:18-slim

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "app.js"]
