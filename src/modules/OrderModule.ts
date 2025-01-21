import { OrderUseCase } from '../usecases/OrderUseCase';
import { PaymentUseCase } from '../usecases/PaymentUseCase';
import { OrderController } from '../controllers/OrderController';
import type { IDatabaseConnection } from '../external/database/DatabaseConnection';
import { OrderRepository } from '../external/repository/OrderRepository';
import { PaymentRepository } from '../external/repository/PaymentRepository';

export default function OrderModule(databaseConnection: IDatabaseConnection) {
  const orderRepository = new OrderRepository(databaseConnection);
  const orderUseCase = new OrderUseCase(orderRepository);
  const paymentRepository = new PaymentRepository(databaseConnection);
  const paymentUseCase = new PaymentUseCase(paymentRepository);
  return new OrderController(orderUseCase, paymentUseCase);
}