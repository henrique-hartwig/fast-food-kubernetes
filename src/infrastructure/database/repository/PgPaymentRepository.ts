import prisma from "../prisma/prismaClient";
import type { IPaymentRepository } from "../../../application/ports/IPaymentRepository";
import { Payment, type PaymentStatus, type PaymentMethod } from "../../../domain/entities/Payment";


export class PgPaymentRepository implements IPaymentRepository {
    async save(payment: Payment): Promise<Payment> {
        const savedPayment = await prisma.payment.create({
            data: payment,
        });
        return new Payment(savedPayment.id, savedPayment.orderId, savedPayment.status as PaymentStatus, savedPayment.paymentMethod as PaymentMethod, savedPayment.amount);
    }

    async findByOrderId(orderId: number): Promise<Payment | null> {
        const payment = await prisma.payment.findUnique({
            where: { orderId },
        });
        return payment ? new Payment(payment.id, payment.orderId, payment.status as PaymentStatus, payment.paymentMethod as PaymentMethod, payment.amount) : null;
    }

    async findAll(): Promise<Payment[]> {
        const payments = await prisma.payment.findMany();
        return payments.map(payment => new Payment(payment.id, payment.orderId, payment.status as PaymentStatus, payment.paymentMethod as PaymentMethod, payment.amount));
    }

    async update(payment: Payment): Promise<Payment> {
        const updatedPayment = await prisma.payment.update({
            where: { id: payment.id },
            data: payment,
        });
        return new Payment(updatedPayment.id, updatedPayment.orderId, updatedPayment.status as PaymentStatus, updatedPayment.paymentMethod as PaymentMethod, updatedPayment.amount);
    }

    async updateStatus(orderId: number, status: PaymentStatus): Promise<Payment> {
        const updatedPayment = await prisma.payment.update({
            where: { id: orderId },
            data: { status },
        });
        return new Payment(updatedPayment.id, updatedPayment.orderId, updatedPayment.status as PaymentStatus, updatedPayment.paymentMethod as PaymentMethod, updatedPayment.amount);
    }
}