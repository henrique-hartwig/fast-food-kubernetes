import { expect, test, describe, mock } from "bun:test";
import { OrderUseCase } from "../../../src/usecases/OrderUseCase";
import { Order } from "../../../src/domain/Order";

describe("OrderUseCase", () => {
  const mockOrderRepository = {
    save: mock(() => Promise.resolve(new Order(1, [], 0, "pending"))),
    findById: mock(() => Promise.resolve(new Order(1, [], 0, "pending"))),
    findAll: mock(() => Promise.resolve([])),
    updateStatus: mock(() => Promise.resolve()),
    query: mock(() => Promise.resolve([]))
  };

  const orderUseCase = new OrderUseCase(mockOrderRepository);

  test("should create order", async () => {
    const items = [{ id: 1, quantity: 2 }];
    const order = await orderUseCase.createOrder(items, 50.0, 1);
    
    expect(order).toBeDefined();
    expect(mockOrderRepository.save).toHaveBeenCalled();
  });

  test("should get order by id", async () => {
    const order = await orderUseCase.getOrderById(1);
    
    expect(order).toBeDefined();
    expect(mockOrderRepository.findById).toHaveBeenCalledWith(1);
  });
});