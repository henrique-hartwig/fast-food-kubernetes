import type { OrderStatus } from '../domain/Order';
import { Payment } from '../domain/Payment';
import type { PaymentStatus, PaymentMethod } from '../domain/Payment';
import type { OrderRepository } from '../external/repository/OrderRepository';
import type { PaymentRepository } from '../external/repository/PaymentRepository';

export class PaymentUseCase {
    constructor(private readonly paymentRepository: PaymentRepository, private readonly orderRepository: OrderRepository) {}

    async createPayment(orderId: number, paymentMethod: PaymentMethod, amount: number): Promise<Payment> {
        const payment = await this.paymentRepository.create(orderId, 'pending', paymentMethod, amount);
        this.processMockPayment(payment.id);
        return payment;
    }

    private async processMockPayment(paymentId: number): Promise<void> {
        const payment = await this.paymentRepository.findById(paymentId);
        if (payment) {
            await new Promise(resolve => setTimeout(resolve, 10000));
            const success = Math.random() < 0.8;
            const newStatus: PaymentStatus = success ? 'paid' : 'failed';
            await this.paymentRepository.updateStatus(paymentId, newStatus);
            this.updateOrderStatus(payment.orderId, success ? 'received' : 'cancelled');
        }
    }

    async getPaymentStatus(paymentId: number): Promise<Payment | null> {
        return this.paymentRepository.findById(paymentId);
    }

    async updateOrderStatus(orderId: number, status: OrderStatus): Promise<void> {
        await this.orderRepository.updateStatus(orderId, status);
    }
}
