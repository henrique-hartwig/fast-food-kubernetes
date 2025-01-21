import { PaymentController } from '../controllers/PaymentController';
import { WebhookController } from '../controllers/WebhookController';
import { PaymentUseCase } from '../usecases/PaymentUseCase';
import { PaymentRepository } from '../external/repository/PaymentRepository';
import type { IDatabaseConnection } from '../external/database/DatabaseConnection';
import { OrderRepository } from '../external/repository/OrderRepository';

export default function paymentModule(databaseConnection: IDatabaseConnection) {
    const paymentRepository = new PaymentRepository(databaseConnection);
    const orderRepository = new OrderRepository(databaseConnection);
    const paymentUseCase = new PaymentUseCase(paymentRepository, orderRepository);
    const paymentController = new PaymentController(paymentUseCase);
    const webhookController = new WebhookController(paymentUseCase);

    return {
        paymentController,
        webhookController
    };
}