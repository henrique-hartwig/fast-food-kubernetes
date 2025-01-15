import type { Payment } from "../../domain/entities/Payment";

export interface IPaymentRepository {
    save(payment: Payment): Promise<Payment>;
    findByOrderId(orderId: number): Promise<Payment | null>;
    findAll(): Promise<Payment[]>;
    update(payment: Payment): Promise<Payment>;
}