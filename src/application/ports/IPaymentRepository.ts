import type { Payment, PaymentStatus } from "../../domain/entities/Payment";

export interface IPaymentRepository {
    save(payment: Payment): Promise<Payment>;
    findByOrderId(orderId: number): Promise<Payment | null>;
    findAll(): Promise<Payment[]>;
    updateStatus(orderId: number, status: PaymentStatus): Promise<Payment>;
}