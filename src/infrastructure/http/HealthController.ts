import type { Request, Response } from 'express';
import { HealthService } from '../../application/services/HealthService';
import { PgHealthRepository } from '../../infrastructure/database/repository/PgHealthRepository';


const healthService = new HealthService(new PgHealthRepository());

export class HealthController {
  async healthCheck(_req: Request, res: Response) {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
    });
  }

  async readinessCheck(_req: Request, res: Response) {
    try {
      await healthService.ping();
      res.json({
        status: 'ok',
        checks: {
          database: 'connected',
          cache: 'connected',
          app: 'ready'
        },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      res.json({
        status: 'error',
        checks: {
          database: 'error',
          cache: 'error',
          app: 'not_ready'
        },
        timestamp: new Date().toISOString(),
      });
    }
  }
}