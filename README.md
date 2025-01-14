# Fast-Food Backend
SOAT Tech Challenge 1 - Backend for Fake Fast-Food restaurant


This is the first version of the Fake Fast-Food Backend. It is a simplified backend for a fake Fast-Food restaurant that will be a monolitic application and relational Database.
The endpoints are for:

- Create, read, update users
- Create, read, update and delete products
- Create, read, update and delete categories
- Create, read, update and delete cart
- Create, read, update and delete orders
- Manage login with CPF
- Manage order status


## Technologies
- [Bun](https://bun.sh/) - Package manager
- [Express](https://expressjs.com/) - Web framework
- [Prisma](https://www.prisma.io/) - ORM



## How to run
1. Clone the repository
2. Run `docker compose up -d` to start the database and application services
3. Run `bun run migrate` to run the migrations
4. Run `bun run seed` to run the seed
5. You can use Postman or any other API client to test the endpoints.



## Folders structure
This project aims to use Hexagonal Architecture, so the following folders structure is composed by Ports and Adapters. The Ports work as interfaces/contracts to asure the attributes and methods to interact with other part. The Adapters are the real implementaion of Ports and these Adapters are present in every part of hexagonal architecture.
It does have that name because is possible have many sides and each side have a proper Adpater.

The example bellow is only using Order as entity, but its the same concept to others.
```
src/
├── application/
│   ├── services/
│   │   └── OrderService.ts
│   └── ports/
│       └── IOrderRepository.ts
├── domain/
│   └── entities/
│       └── Order.ts
├── infrastructure/
│   ├── database/
│   │   ├── prisma/
│   │   │   └── prismaClient.ts
│   │   ├── repository/
│   │       └── PgOrderRepository.ts
│   ├── http/
│   │   └── OrderController.ts
│   └── config/
│       └── config.ts
├── index.ts
├── server.ts
├── routes.ts
```
