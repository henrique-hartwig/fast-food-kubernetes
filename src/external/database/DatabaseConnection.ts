import { Prisma, PrismaClient } from '@prisma/client';

export interface IBaseDatabaseOperations<T> {
  findAll(): Promise<T[]>;
  findById(id: string | number): Promise<T | null>;
  create(data: any): Promise<T>;
  update(id: string | number, data: any): Promise<T>;
  delete(id: string | number): Promise<void>;
}

export interface IDatabaseConnection extends PrismaClient {
    close(): void;
    open(): void;
    query(query: string): Promise<any[]>;
    getRepository<T>(entity: string): IBaseDatabaseOperations<T>;
}

export default class DatabaseConnection extends PrismaClient implements IDatabaseConnection {
  readonly connection: PrismaClient;

  constructor() {
    super();
    this.connection = this;
  }

  async query(queryTemplate: string, params?: any[]): Promise<any[]> {
    if (!params || params.length === 0) {
      return this.connection.$queryRawUnsafe(queryTemplate);
    }

    const numberedQuery = queryTemplate.replace(/\?/g, (_, i) => `$${i + 1}`);

    return this.connection.$queryRaw.apply(
      this.connection,
      [Prisma.sql([numberedQuery, ...params])]
    ) as Promise<any[]>;
  }

  open(): void {
    this.connection.$connect();
  }

  close(): void {
    this.connection.$disconnect();
  }

  getRepository<T>(entity: string): IBaseDatabaseOperations<T> {
    const prismaEntity = this.connection[entity as keyof PrismaClient] as any;

    return {
      findAll: async () => {
        return prismaEntity.findMany();
      },
      findById: async (id: string | number) => {
        return prismaEntity.findUnique({
          where: { id }
        });
      },
      create: async (data: any) => {
        return prismaEntity.create({
          data
        });
      },
      update: async (id: string | number, data: any) => {
        return prismaEntity.update({
          where: { id },
          data
        });
      },
      delete: async (id: string | number) => {
        await prismaEntity.delete({
          where: { id }
        });
      }
    };
  }
}
