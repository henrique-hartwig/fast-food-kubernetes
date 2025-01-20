import prisma from '../prisma/prismaClient';
import type { IOrderRepository } from '../../../application/ports/IOrderRepository';
import { Order } from '../../../domain/entities/Order';

export class PgOrderRepository implements IOrderRepository {
  async save(order: Order): Promise<Order> {
    const createdOrder = await prisma.order.create({
      data: {
        items: order.items,
        total: order.total,
      },
    });
    return new Order(createdOrder.id, createdOrder.items as { id: number; quantity: number }[], createdOrder.total, createdOrder.status as Order['status'], createdOrder.userId ?? undefined);
  }

  async findById(id: number): Promise<Order | null> {
    const orderData = await prisma.order.findUnique({
      where: { id },
    });

    if (!orderData) {
      return null;
    }

    return new Order(orderData.id, orderData.items as { id: number; quantity: number }[], orderData.total, orderData.status as Order['status'], orderData.userId ?? undefined);
  }

  async findAll(): Promise<Order[]> {
    const ordersData = await prisma.order.findMany();
    return ordersData.map(order => new Order(order.id, order.items as { id: number; quantity: number }[], order.total, order.status as Order['status'], order.userId ?? undefined));
  }
}
