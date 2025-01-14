import { User } from '../../domain/entities/User';

export interface IUserRepository {
  save(user: User): Promise<void>;
  findByCpf(cpf: string): Promise<User | null>;
}
