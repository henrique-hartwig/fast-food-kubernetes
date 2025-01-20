import { OrderService } from '../../application/services/OrderService';
import { PaymentService } from '../../application/services/PaymentService';
import type { Order } from '../../domain/entities/Order';
import { PgOrderRepository } from '../database/repository/PgOrderRepository';
import { PgPaymentRepository } from '../database/repository/PgPaymentRepository';


const orderRepository = new PgOrderRepository();
const orderService = new OrderService(orderRepository);
const paymentRepository = new PgPaymentRepository();
const paymentService = new PaymentService(paymentRepository);

export class OrderController {
  async createOrder(req: any, res: any) {
    try {
      const { items, total, userId } = req.body;
      const order = await orderService.createOrder(items, total, userId);
      await this.handleOrderCreated(order);
      return res.status(201).json(order);
    } catch (error: any) {
      console.error('Error creating order:', error);
      return res.status(500).json({ 
        message: 'Internal server error',
        error: error.message 
      });
    }
  }

  async getOrderById(req: any, res: any) {
    try {
      const order = await orderService.getOrderById(Number(req.params.id));
      return order ? res.status(200).json(order) : res.status(404).json({ message: 'Order not found' });
    } catch (error: any) {
      console.error('Error searching order:', error);
      return res.status(500).json({ 
        message: 'Internal server error',
        error: error.message 
      });
    }
  }

  async getAllOrders(req: any, res: any) {
    try {
      const orders = await orderService.getAllOrders();
      return res.status(200).json(orders);
    } catch (error: any) {
      console.error('Error searching orders:', error);
      return res.status(500).json({ 
        message: 'Internal server error',
        error: error.message 
      });
    }
  }

  private async handleOrderCreated(order: Order) {
    try {
      const payment = await paymentService.createPayment(
        order.id,
        'pending',
        'credit_card',
        order.total
      );
      // i'll put my payment gateway here/webhook
    } catch (error) {
      console.error('Failed to create payment:', error);
    }
  }
}
