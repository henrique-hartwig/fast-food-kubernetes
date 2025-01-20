import type { IHealthRepository } from '../ports/IHealthRepository';

export class HealthService {
    constructor(private healthRepository: IHealthRepository) {}
    async ping(): Promise<boolean> {
      try {
        return await this.healthRepository.ping();
      } catch (error) {
        throw new Error('Database connection failed');
      }
    }
  }