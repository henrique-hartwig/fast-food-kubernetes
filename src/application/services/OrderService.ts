import type { IOrderRepository } from '../ports/IOrderRepository';
import { Order } from '../../domain/entities/Order';


export class OrderService {
  constructor(private orderRepository: IOrderRepository) {}

  async createOrder(items: { id: number; quantity: number }[], total: number, userId?: number): Promise<Order> {
    const order = new Order(Date.now(), items, total, 'received', userId);
    return this.orderRepository.save(order);
  }

  async getOrderById(id: number): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }
}
