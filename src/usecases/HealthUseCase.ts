import type { IHealthRepository } from '../external/repository/HealthRepository';

export interface IHealthUseCase {
  healthCheck(): Promise<boolean>;
  readyCheck(): Promise<boolean>;
}

export class HealthUseCase implements IHealthUseCase {
  constructor(private readonly healthRepository: IHealthRepository) {}

  async healthCheck(): Promise<boolean> {
    return true;
  }

  async readyCheck(): Promise<boolean> {
    const result = await this.healthRepository.ready();
    return result.length > 0;
  }
}
