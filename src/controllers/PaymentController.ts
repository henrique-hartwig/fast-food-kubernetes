import type { PaymentUseCase } from "../usecases/PaymentUseCase";

export class PaymentController {
    constructor(private readonly paymentUseCase: PaymentUseCase) {}

    async createPayment(req: any, res: any): Promise<void> {
        const { orderId, status, paymentMethod, amount } = req.body;
        const payment = await this.paymentUseCase.createPayment(orderId, status, paymentMethod, amount);
        return res.status(201).json(payment);
    }
}