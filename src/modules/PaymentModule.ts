import { PaymentController } from "../controllers/PaymentController";
import type { IDatabaseConnection } from "../external/database/DatabaseConnection";
import { PaymentRepository } from "../external/repository/PaymentRepository";
import { PaymentUseCase } from "../usecases/PaymentUseCase";

export default function PaymentModule(databaseConnection: IDatabaseConnection) {
    const paymentRepository = new PaymentRepository(databaseConnection);
    const paymentUseCase = new PaymentUseCase(paymentRepository);
    return new PaymentController(paymentUseCase);
}