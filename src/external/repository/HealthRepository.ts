import type { IDatabaseConnection } from '../database/DatabaseConnection';

export interface IHealthRepository {
  ready(): Promise<any[]>;
}

export class HealthRepository implements IHealthRepository {
  constructor(private readonly databaseConnection: IDatabaseConnection) {}

  async ready(): Promise<any[]> {
    return await this.databaseConnection.query('SELECT 1');
  }
}
