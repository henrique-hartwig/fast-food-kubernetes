import type { Request, Response } from 'express';
import type { PaymentUseCase } from '../usecases/PaymentUseCase';

export class WebhookController {
    constructor(private readonly paymentUseCase: PaymentUseCase) {}

    async handlePaymentUpdate(req: Request, res: Response): Promise<void> {
        try {
            const paymentId = Number(req.params.paymentId);
            const payment = await this.paymentUseCase.getPaymentStatus(paymentId);

            if (!payment) {
                res.status(404).json({ error: 'Pagamento não encontrado' });
                return;
            }

            res.status(200).json({
                paymentId: payment.id,
                orderId: payment.orderId,
                status: payment.status,
                paymentMethod: payment.paymentMethod,
                amount: payment.amount
            });
        } catch (error) {
            console.error('Erro ao processar webhook:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
} 