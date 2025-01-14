import prisma from '../prisma/prismaClient';
import type { IUserRepository } from '../../../application/ports/IUserRepository';
import { User } from '../../../domain/entities/User';

export class PgUserRepository implements IUserRepository {
  async save(user: User): Promise<void> {
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        cpf: user.cpf,
      },
    });
  }

  async findByCpf(cpf: string): Promise<User | null> {
    const userData = await prisma.user.findUnique({
      where: { cpf },
    });

    if (!userData) {
      return null;
    }

    return new User(userData.id, userData.name, userData.email, userData.cpf);
  }
}
