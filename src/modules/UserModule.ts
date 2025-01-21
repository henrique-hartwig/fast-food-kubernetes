import { UserController } from "../controllers/UserController";
import type { IDatabaseConnection } from "../external/database/DatabaseConnection";
import { UserRepository } from "../external/repository/UserRepository";
import { UserUseCase } from "../usecases/UserUseCase";

export default function UserModule(databaseConnection: IDatabaseConnection) {
    const userRepository = new UserRepository(databaseConnection);
    const userUseCase = new UserUseCase(userRepository);
    return new UserController(userUseCase);
}