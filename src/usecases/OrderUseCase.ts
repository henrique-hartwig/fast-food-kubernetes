import type { IOrderRepository } from '../external/repository/OrderRepository';
import { Order } from '../domain/Order';


export class OrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async createOrder(items: { id: number; quantity: number }[], total: number, userId?: number): Promise<Order> {
    const order = new Order(Date.now(), items, total, 'pending', userId);
    return this.orderRepository.save(order);
  }

  async getOrderById(id: number): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  async getOpenOrders(): Promise<Order[]> {
    const query = `
        SELECT 
            o.id,
            o."createdAt",
            o."updatedAt",
            o.status,
            o."userId",
            json_agg(
                json_build_object(
                    'item', p.name,
                    'quantity', (items.item->>'quantity')::integer
                )
            ) as items
        FROM public."Order" o,
            jsonb_array_elements(o.items) as items(item),
            public."Product" p
        WHERE 
            o.status IN ('received', 'in_preparation', 'ready')
            AND (items.item->>'id')::integer = p.id
        GROUP BY 
            o.id,
            o.total,
            o."createdAt",
            o."updatedAt",
            o.status,
            o."userId"
        ORDER BY 
            CASE o.status 
                WHEN 'ready' THEN 1
                WHEN 'in_preparation' THEN 2
                WHEN 'received' THEN 3
            END,
            o."createdAt" ASC
    `;
    const orders = await this.orderRepository.query(query);
    return orders;
  }
}
