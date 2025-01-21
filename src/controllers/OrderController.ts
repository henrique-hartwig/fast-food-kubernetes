import { OrderUseCase } from '../usecases/OrderUseCase';
import { PaymentUseCase } from '../usecases/PaymentUseCase';
import type { Order } from '../domain/Order';
import type { Request, Response } from 'express';
import type { PaymentMethod } from '../domain/Payment';

export class OrderController {
  constructor(
    private readonly orderUseCase: OrderUseCase,
    private readonly paymentUseCase: PaymentUseCase
  ) {}

  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const { items, total, userId, paymentMethod = 'credit_card' } = req.body;
      const order = await this.orderUseCase.createOrder(items, total, userId);
      await this.handleOrderCreated(order, paymentMethod as PaymentMethod);
      res.status(201).json(order);
    } catch (error: any) {
      console.error('Error creating order:', error);
      res.status(500).json({ 
        message: 'Internal server error',
        error: error.message 
      });
    }
  }

  async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const order = await this.orderUseCase.getOrderById(Number(req.params.id));
      order ? res.status(200).json(order) : res.status(404).json({ message: 'Order not found' });
    } catch (error: any) {
      console.error('Error searching order:', error);
      res.status(500).json({ 
        message: 'Internal server error',
        error: error.message 
      });
    }
  }

  async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const orders = await this.orderUseCase.getAllOrders();
      res.status(200).json(orders);
    } catch (error: any) {
      console.error('Error searching orders:', error);
      res.status(500).json({ 
        message: 'Internal server error',
        error: error.message 
      });
    }
  }

  private async handleOrderCreated(order: Order, paymentMethod: PaymentMethod): Promise<void> {
    try {
      await this.paymentUseCase.createPayment(
        order.id,
        paymentMethod,
        order.total
      );
    } catch (error) {
      console.error('Failed to create payment:', error);
      throw error; // Propagar o erro para que a criação do pedido também falhe
    }
  }
}
