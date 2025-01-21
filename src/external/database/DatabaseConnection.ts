import { Prisma, PrismaClient } from '@prisma/client';

export interface IDatabaseConnection extends PrismaClient {
    close(): void;
    open(): void;
    query(query: string): Promise<any[]>;
}

export default class DatabaseConnection extends PrismaClient implements IDatabaseConnection {
  readonly connection: IDatabaseConnection;

  constructor() {
    super();
    this.connection = this;
  }

  async query(query: string): Promise<any[]> {
    return this.connection.$queryRaw<Array<any>>(Prisma.sql`${query}`);
  }

  open(): void {
    this.connection.$connect();
  }

  close(): void {
    this.connection.$disconnect();
  }
}
