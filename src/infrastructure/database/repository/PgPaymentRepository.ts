import prisma from "../prisma/prismaClient";
import type { IPaymentRepository } from "../../../application/ports/IPaymentRepository";
import type { Payment } from "../../../domain/entities/Payment";

export class PgPaymentRepository implements IPaymentRepository {
    async save(payment: Payment): Promise<Payment> {
        return await prisma.payment.create({
            data: payment,
        });
    }

    async findByOrderId(orderId: number): Promise<Payment | null> {
        return await prisma.payment.findUnique({
            where: { orderId },
        });
    }

    async findAll(): Promise<Payment[]> {
        return await prisma.payment.findMany();
    }

    async update(payment: Payment): Promise<Payment> {
        return await prisma.payment.update({
            where: { id: payment.id },
            data: payment,
        });
    }
}