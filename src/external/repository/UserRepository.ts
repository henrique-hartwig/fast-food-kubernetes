import type { IDatabaseConnection } from '../database/DatabaseConnection';
import { User } from '../../domain/User';


export interface IUserRepository {
  save(user: User): Promise<void>;
  findByCpf(cpf: string): Promise<User | null>;
}

export class UserRepository implements IUserRepository {
  constructor(private readonly databaseConnection: IDatabaseConnection) {}

  async save(user: User): Promise<void> {
    await this.databaseConnection.user.create({
      data: {
        name: user.name,
        email: user.email,
        cpf: user.cpf,
      },
    });
  }

  async findByCpf(cpf: string): Promise<User | null> {
    const userData = await this.databaseConnection.user.findUnique({
      where: { cpf },
    });

    if (!userData) {
      return null;
    }

    return new User(userData.id, userData.name, userData.email, userData.cpf);
  }
}
