import { OrderController } from '../controllers/OrderController';
import { OrderUseCase } from '../usecases/OrderUseCase';
import { OrderRepository } from '../external/repository/OrderRepository';
import { PaymentUseCase } from '../usecases/PaymentUseCase';
import type { IDatabaseConnection } from '../external/database/DatabaseConnection';
import { PaymentRepository } from '../external/repository/PaymentRepository';

export default function orderModule(databaseConnection: IDatabaseConnection) {
    const orderRepository = new OrderRepository(databaseConnection);
    const orderUseCase = new OrderUseCase(orderRepository);
    const paymentRepository = new PaymentRepository(databaseConnection);
    const paymentUseCase = new PaymentUseCase(paymentRepository, orderRepository);
    return new OrderController(orderUseCase, paymentUseCase);
}