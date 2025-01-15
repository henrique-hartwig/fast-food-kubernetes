import type { Payment, PaymentMethod, PaymentStatus } from "../../domain/entities/Payment";
import type { IPaymentRepository } from "../ports/IPaymentRepository";

export class PaymentService {
    constructor(private readonly paymentRepository: IPaymentRepository) {}

    async createPayment(orderId: number, status: PaymentStatus, paymentMethod: PaymentMethod, amount: number): Promise<Payment> {
        const payment = new Payment(orderId, status, paymentMethod, amount);
        return this.paymentRepository.save(payment);
    }

    async getPaymentByOrderId(orderId: number): Promise<Payment | null> {
        return this.paymentRepository.findByOrderId(orderId);
    }

    async getAllPayments(): Promise<Payment[]> {
        return this.paymentRepository.findAll();
    }

    async updatePayment(payment: Payment): Promise<Payment> {
        return this.paymentRepository.update(payment);
    }
}