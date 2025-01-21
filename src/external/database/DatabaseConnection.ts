import { Prisma, PrismaClient } from '@prisma/client';

export interface IDatabaseConnection extends PrismaClient {
    query(query: string): Promise<any[]>;
    close(): void;
}

export default class DatabaseConnection extends PrismaClient implements IDatabaseConnection {
  readonly connection: IDatabaseConnection;

  constructor() {
    super();
    this.connection = this;
  }

  query(query: string): Promise<any[]> {
    return this.connection.$queryRaw<Array<any>>(Prisma.sql`${query}`);
  }

  close(): void {
    this.connection.$disconnect();
  }
}
