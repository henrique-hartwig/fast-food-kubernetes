FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lockb* ./

RUN bun install

COPY src/ ./src
COPY tsconfig.json ./

RUN bunx prisma generate --schema=./src/external/database/schema.prisma

EXPOSE 3000

CMD ["bun", "start"]
