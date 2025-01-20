import { OrderService } from '../../application/services/OrderService';
import { PaymentService } from '../../application/services/PaymentService';
import type { Order } from '../../domain/entities/Order';
import { Payment } from '../../domain/entities/Payment';
import { PgOrderRepository } from '../database/repository/PgOrderRepository';
import { PgPaymentRepository } from '../database/repository/PgPaymentRepository';

const orderRepository = new PgOrderRepository();
const orderService = new OrderService(orderRepository);
const paymentRepository = new PgPaymentRepository();
const paymentService = new PaymentService(paymentRepository);

export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly paymentService: PaymentService
  ) {}

  async createOrder(req: any, res: any) {
    const { items, total, userId } = req.body;
    const order = await this.orderService.createOrder(items, total, userId);
    await this.handleOrderCreated(order);
    return res.status(201).json(order);
  }

  async getOrderById(req: any, res: any) {
    const order = await orderService.getOrderById(Number(req.params.id));
    return order ? res.json(order) : res.status(404).json({ message: 'Order not found' });
  }

  async getAllOrders(req: any, res: any) {
    const orders = await orderService.getAllOrders();
    return res.json(orders);
  }

  private async handleOrderCreated(order: Order) {
    try {
      const payment = await this.paymentService.createPayment(
        order.id,
        'pending',
        'credit_card',
        order.total
      );
      // Aqui você pode integrar com seu gateway de pagamento
      // e gerar um link de pagamento ou token
    } catch (error) {
      // Trate o erro apropriadamente
      console.error('Failed to create payment:', error);
    }
  }
}
