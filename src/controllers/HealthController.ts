import type { Request, Response } from 'express';
import type { IHealthUseCase } from '../usecases/HealthUseCase';

export class HealthController {
  constructor(private readonly healthUseCase: IHealthUseCase) {}

  async healthCheck(_req: Request, res: Response): Promise<void> {
    res.status(200).send('The HTTP Server is healthy');
  }

  async readyCheck(_req: Request, res: Response): Promise<void> {
    const result = await this.healthUseCase.readyCheck();
    result ? res.status(200).send('ok') : res.status(500).send('error');
  }
}
