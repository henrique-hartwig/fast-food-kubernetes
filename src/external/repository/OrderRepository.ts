import type { IDatabaseConnection } from '../database/DatabaseConnection';
import { Order, type OrderStatus } from '../../domain/Order';


export interface IOrderRepository {
  save(order: Order): Promise<Order>;
  findById(id: number): Promise<Order | null>;
  findAll(): Promise<Order[]>;
  updateStatus(orderId: number, status: Order['status']): Promise<void>;
}

export class OrderRepository implements IOrderRepository {
  constructor(private readonly databaseConnection: IDatabaseConnection) {}

  async save(order: Order): Promise<Order> {
    const createdOrder = await this.databaseConnection.order.create({
      data: {
        items: order.items,
        total: order.total,
      },
    });
    return new Order(createdOrder.id, createdOrder.items as { id: number; quantity: number }[], createdOrder.total, createdOrder.status as Order['status'], createdOrder.userId ?? undefined);
  }

  async findById(id: number): Promise<Order | null> {
    const orderData = await this.databaseConnection.order.findUnique({
      where: { id },
    });

    if (!orderData) {
      return null;
    }

    return new Order(orderData.id, orderData.items as { id: number; quantity: number }[], orderData.total, orderData.status as Order['status'], orderData.userId ?? undefined);
  }

  async findAll(): Promise<Order[]> {
    const ordersData = await this.databaseConnection.order.findMany();
    return ordersData.map(order => new Order(order.id, order.items as { id: number; quantity: number }[], order.total, order.status as Order['status'], order.userId ?? undefined));
  }

  async updateStatus(id: number, status: OrderStatus): Promise<void> {
    await this.databaseConnection.order.update({
      where: { id },
      data: { status },
    });
  }
}
