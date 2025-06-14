FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/dist ./
COPY package*.json ./
RUN npm install --production
EXPOSE 3000
CMD ["node", "app.js"]