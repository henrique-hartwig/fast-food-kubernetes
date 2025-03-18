import { expect, test, describe, beforeAll, afterAll } from "bun:test";
import { HttpServer } from "../../../src/httpServer";
import DatabaseConnection from "../../../src/external/database/DatabaseConnection";
import { setupRoutes } from "../../../src/routes";
import request from "supertest";

describe("Order Integration Flow", () => {
  const server = new HttpServer();
  const app = server.getApp();
  const databaseConnection = new DatabaseConnection();
  
  beforeAll(async () => {
    await databaseConnection.payment.deleteMany();
    await databaseConnection.order.deleteMany();
    await databaseConnection.product.deleteMany();
    await databaseConnection.productCategory.deleteMany();

    setupRoutes(server, databaseConnection);
    
    await databaseConnection.productCategory.create({
      data: {
        id: 1,
        name: "Product Category",
        description: "Product Category Description"
      }
    });

    await databaseConnection.product.create({
      data: {
        id: 1,
        name: "Test Product",
        price: 25.0,
        categoryId: 1,
        description: "Test Product Description"
      }
    });
  });

  afterAll(async () => {
    await databaseConnection.payment.deleteMany();
    await databaseConnection.order.deleteMany();
    await databaseConnection.product.deleteMany();
    await databaseConnection.productCategory.deleteMany();
    await databaseConnection.close();
  });

  test("should create and retrieve order", async () => {
    const orderData = {
      items: [{ id: 1, quantity: 2 }],
      total: 50.0,
      userId: 1
    };

    const createResponse = await request(app)
      .post("/api/orders")
      .send(orderData);
    
    expect(createResponse.status).toBe(201);
    
    const orderId = createResponse.body.id;

    const getResponse = await request(app)
      .get(`/api/orders/${orderId}`);
    
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.total).toBe(50.0);
  });

  test("should list open orders", async () => {
    const response = await request(app)
      .get("/api/orders");
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});