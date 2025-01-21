# Fast-Food Backend
SOAT Tech Challenge 2 - Improving the Fast-Food Backend

This is the second version of the Fake Fast-Food Backend. It is a simplified backend for a fake Fast-Food restaurant that will be a monolitic application and relational Database.
At this thime, I've changed the architecture from Hexagonal to Clean Architecture. Also, the deployment won't be with Docker Compose, but with Kubernetes.

The endpoints are for:

- Create, read, update users
- Create, read, update and delete products
- Create, read, update and delete categories
- Create, read, update and delete cart
- Create, read, update and delete orders
- Manage login with CPF
- Manage order status


## Technologies
Application:
- [Bun](https://bun.sh/) - Package manager
- [Express](https://expressjs.com/) - Web framework
- [Prisma](https://www.prisma.io/) - ORM
- [PostgreSQL](https://www.postgresql.org/) - Database


Deployment:
- [Docker](https://www.docker.com/) - Containerization
- [Kubernetes](https://kubernetes.io/) - Container orchestration
- [Minikube](https://minikube.sigs.k8s.io/docs/) - Local Kubernetes cluster


## How to run
1. Clone the repository
2. Setup minikube to use docker as driver and start the cluster
   ```bash
   minikube start --driver=docker
   ```
   or if already have minikube installed

   ```bash
   minikube start
   ```
3. To deploy the application, execute:
   ```bash
   ./deploy.sh
   ```
   This script will:
   - Create the ConfigMap with environment variables
   - Configure the storage (StorageClass, PV and PVC)
   - Deploy the database
   - Execute the migrations
   - Execute the seed data
   - Deploy the application locally with minikube

3. To remove all resources, execute:
   ```bash
   ./undeploy.sh
   ```
   
4. You can use Postman or any other API client to test the endpoints through address returned by the deploy script.
 
 Example: GET http://192.168.49.2:32115/api/health


Important Notes:
- Using simple Opaque secrets to store the database password and database url.


## Folders structure
This project aims to use Hexagonal Architecture, so the following folders structure is composed by Ports and Adapters. The Ports work as interfaces/contracts to asure the attributes and methods to interact with other part. The Adapters are the real implementaion of Ports and these Adapters are present in every part of hexagonal architecture.
It does have that name because is possible have many sides and each side have a proper Adpater.

The example bellow is only using Order as entity, but its the same concept to others.
```
src/
├── controllers/
│   └── OrderController.ts
├── domain/
│   └── Order.ts
├── external/
│   └── database/
│   |    └── DatabaseConnection.ts
│   └── repository/
│     └── OrderRepository.ts
├── modules/
│   └── OrderModule.ts
├── usecases/
│   └── OrderUseCase.ts
├── index.ts
├── httpServer.ts
├── routes.ts
```
