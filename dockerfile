FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY dist/. ./

EXPOSE 3000

CMD ["node", "app.js"]
