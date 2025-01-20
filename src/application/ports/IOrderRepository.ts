import { Order, type OrderStatus } from '../../domain/entities/Order';

export interface IOrderRepository {
  save(order: Order): Promise<Order>;
  findById(id: number): Promise<Order | null>;
  findAll(): Promise<Order[]>;
  updateStatus(orderId: number, status: OrderStatus): Promise<Order>;
}
