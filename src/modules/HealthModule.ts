import { HealthController } from '../controllers/HealthController';
import { HealthUseCase } from '../usecases/HealthUseCase';
import { HealthRepository } from '../external/repository/HealthRepository';
import type { IDatabaseConnection } from '../external/database/DatabaseConnection';

export default function healthModule(databaseConnection: IDatabaseConnection) {
  const healthRepository = new HealthRepository(databaseConnection);
  const healthUseCase = new HealthUseCase(healthRepository);
  return new HealthController(healthUseCase);
}
