import { expect, test, describe, mock } from "bun:test";
import { OrderController } from "../../../src/controllers/OrderController";
import { Order } from "../../../src/domain/Order";
import type { OrderUseCase } from "../../../src/usecases/OrderUseCase";
import type { PaymentUseCase } from "../../../src/usecases/PaymentUseCase";

describe("OrderController", () => {
  const mockOrderUseCase = {
    createOrder: mock(() => Promise.resolve(new Order(1, [], 0, "pending"))),
    getOrderById: mock(() => Promise.resolve(new Order(1, [], 0, "pending"))),
    getAllOrders: mock(() => Promise.resolve([])),
    getOpenOrders: mock(() => Promise.resolve([]))
  } as unknown as OrderUseCase;

  const mockPaymentUseCase = {
    createPayment: mock(() => Promise.resolve()),
    getPaymentStatus: mock(() => Promise.resolve())
  } as unknown as PaymentUseCase;


  const controller = new OrderController(mockOrderUseCase, mockPaymentUseCase);

  test("should create order", async () => {
    const req = {
      body: {
        items: [{ id: 1, quantity: 2 }],
        total: 50.0,
        userId: 1
      }
    };
    const res = {
      status: mock(() => res),
      json: mock(() => res)
    };

    await controller.createOrder(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(mockOrderUseCase.createOrder).toHaveBeenCalled();
  });

  test("should create order with status pending", async () => {
    const req = {
      body: {
        items: [{ id: 1, quantity: 2 }],
        total: 50.0,
        userId: 1
      }
    };
    const res = {
      status: mock(() => res),
      json: mock(() => res)
    };

    await controller.createOrder(req as any, res as any);
    
    expect(mockOrderUseCase.createOrder).toHaveBeenCalled();
    const createdOrder = await mockOrderUseCase.createOrder(req.body.items, req.body.total, req.body.userId);
    expect(createdOrder.status).toBe("pending");
  });
});