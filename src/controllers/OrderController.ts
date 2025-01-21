import { OrderUseCase } from '../usecases/OrderUseCase';
import { PaymentUseCase } from '../usecases/PaymentUseCase';
import type { Order } from '../domain/Order';


export class OrderController {
  constructor(private readonly orderUseCase: OrderUseCase, private readonly paymentUseCase: PaymentUseCase) {}

  async createOrder(req: any, res: any) {
    try {
      const { items, total, userId } = req.body;
      const order = await this.orderUseCase.createOrder(items, total, userId);
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
      const order = await this.orderUseCase.getOrderById(Number(req.params.id));
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
      const orders = await this.orderUseCase.getAllOrders();
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
      const payment = await this.paymentUseCase.createPayment(
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
