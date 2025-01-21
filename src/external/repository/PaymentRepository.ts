import type { IDatabaseConnection } from "../database/DatabaseConnection";
import { Payment } from "../../domain/Payment";


export interface IPaymentRepository {
    save(payment: Payment): Promise<Payment>;
    findByOrderId(orderId: number): Promise<Payment | null>;
    findAll(): Promise<Payment[]>;
    update(payment: Payment): Promise<Payment>;
}

export class PaymentRepository implements IPaymentRepository {
    constructor(private readonly databaseConnection: IDatabaseConnection) {}

    async save(payment: Payment): Promise<Payment> {
        const createdPayment = await this.databaseConnection.payment.create({
            data: payment,
        });
        return new Payment(createdPayment.id, createdPayment.orderId, createdPayment.status as Payment['status'], createdPayment.paymentMethod as Payment['paymentMethod'], createdPayment.amount);
    }

    async findByOrderId(orderId: number): Promise<Payment | null> {
        const paymentData = await this.databaseConnection.payment.findUnique({
            where: { orderId },
        });

        if (!paymentData) {
            return null;
        }

        return new Payment(paymentData.id, paymentData.orderId, paymentData.status as Payment['status'], paymentData.paymentMethod as Payment['paymentMethod'], paymentData.amount);
    }

    async findAll(): Promise<Payment[]> {
        const paymentsData = await this.databaseConnection.payment.findMany();
        return paymentsData.map(payment => new Payment(payment.id, payment.orderId, payment.status as Payment['status'], payment.paymentMethod as Payment['paymentMethod'], payment.amount));
    }

    async update(payment: Payment): Promise<Payment> {
        const updatedPayment = await this.databaseConnection.payment.update({
            where: { id: payment.id },
            data: payment,
        });
        return new Payment(updatedPayment.id, updatedPayment.orderId, updatedPayment.status as Payment['status'], updatedPayment.paymentMethod as Payment['paymentMethod'], updatedPayment.amount);
    }
}