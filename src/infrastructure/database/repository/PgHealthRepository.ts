import type { IHealthRepository } from '../../../application/ports/IHealthRepository';
import prisma from '../prisma/prismaClient';

export class PgHealthRepository implements IHealthRepository {
  async ping(): Promise<boolean> {
    try {
      const result = await prisma.$queryRaw<Array<any>>`SELECT 1`;
      return result.length > 0;
    } catch (error) {
      return false;
    }
  }
}
