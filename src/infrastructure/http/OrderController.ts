import { OrderService } from '../../application/services/OrderService';
import { PgOrderRepository } from '../database/repository/PgOrderRepository';

const orderRepository = new PgOrderRepository();
const orderService = new OrderService(orderRepository);

export class OrderController {
  async createOrder(req: any, res: any) {
    const { items, total, userId } = req.body;
    const order = await orderService.createOrder(items, total, userId);
    res.status(201).json(order);
  }

  async getOrderById(req: any, res: any) {
    const order = await orderService.getOrderById(Number(req.params.id));
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  }

  async getAllOrders(req: any, res: any) {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  }
}
