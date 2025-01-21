import type { IBaseDatabaseOperations, IDatabaseConnection } from '../database/DatabaseConnection';
import { Order, type OrderStatus } from '../../domain/Order';


export interface IOrderRepository {
  save(order: Order): Promise<Order>;
  findById(id: number): Promise<Order | null>;
  findAll(): Promise<Order[]>;
  updateStatus(orderId: number, status: Order['status']): Promise<void>;
  query(query: string, params?: any[]): Promise<any[]>;
}

export class OrderRepository implements IOrderRepository {
  private orderRepository: IBaseDatabaseOperations<Order>;

  constructor(private readonly databaseConnection: IDatabaseConnection) {
    this.orderRepository = this.databaseConnection.getRepository('order');
  }

  async save(order: Order): Promise<Order> {
    const createdOrder = await this.orderRepository.create({
      items: order.items,
      total: order.total,
    });
    return new Order(createdOrder.id, createdOrder.items as { id: number; quantity: number }[], createdOrder.total, createdOrder.status as Order['status'], createdOrder.userId ?? undefined);
  }

  async findById(id: number): Promise<Order | null> {
    const orderData = await this.orderRepository.findById(id);

    if (!orderData) {
      return null;
    }

    return new Order(orderData.id, orderData.items as { id: number; quantity: number }[], orderData.total, orderData.status as Order['status'], orderData.userId ?? undefined);
  }

  async findAll(): Promise<Order[]> {
    const ordersData = await this.orderRepository.findAll();
    return ordersData.map(order => new Order(order.id, order.items as { id: number; quantity: number }[], order.total, order.status as Order['status'], order.userId ?? undefined));
  }

  async updateStatus(id: number, status: OrderStatus): Promise<void> {
    await this.orderRepository.update(id, { status });
  }

  async query(query: string): Promise<any[]> {
    return this.databaseConnection.query(query);
  }
}
