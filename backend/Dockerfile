FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && npm run start:dev"]