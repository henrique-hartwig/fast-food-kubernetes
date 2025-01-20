import { Payment, type PaymentMethod, type PaymentStatus } from "../../domain/entities/Payment";
import type { IPaymentRepository } from "../ports/IPaymentRepository";

export class PaymentService {
    constructor(private readonly paymentRepository: IPaymentRepository) {}

    async createPayment(orderId: number, status: PaymentStatus, paymentMethod: PaymentMethod, amount: number): Promise<Payment> {
        const payment = new Payment(0, orderId, status, paymentMethod, amount);
        return this.paymentRepository.save(payment);
    }

    async getPaymentByOrderId(orderId: number): Promise<Payment | null> {
        return this.paymentRepository.findByOrderId(orderId);
    }

    async getAllPayments(): Promise<Payment[]> {
        return this.paymentRepository.findAll();
    }

    async updatePaymentStatus(orderId: number, status: PaymentStatus): Promise<Payment> {
        const payment = await this.paymentRepository.findByOrderId(orderId);
        if (!payment) {
          throw new Error('Payment not found');
        }
        payment.status = status;
        return this.paymentRepository.save(payment);
      }
}