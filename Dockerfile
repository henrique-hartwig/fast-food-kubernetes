FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lockb* ./

RUN bun install

COPY src/ ./src
COPY tsconfig.json ./
COPY .env ./

RUN bunx prisma generate --schema=./src/infrastructure/database/prisma/schema.prisma

EXPOSE 3000

CMD ["bun", "start"]
