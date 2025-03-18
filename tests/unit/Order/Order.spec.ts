import { expect, test, describe } from "bun:test";
import { Order } from "../../../src/domain/Order";

describe("Order Domain", () => {
  test("should create a valid order", () => {
    const order = new Order(1, [{ id: 1, quantity: 2 }], 50.0, "pending", 1);
    
    expect(order.id).toBe(1);
    expect(order.total).toBe(50.0);
    expect(order.status).toBe("pending");
    expect(order.items).toHaveLength(1);
  });

  test("should accept optional userId", () => {
    const order = new Order(1, [{ id: 1, quantity: 2 }], 50.0, "pending");
    
    expect(order.userId).toBeUndefined();
  });
});