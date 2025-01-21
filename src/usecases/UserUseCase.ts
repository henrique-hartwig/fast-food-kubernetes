import { User } from '../domain/User';
import { UserRepository } from '../external/repository/UserRepository';

export class UserUseCase {
  constructor(private userRepository: UserRepository) {}

  async createUser(name: string, email: string, cpf: string): Promise<{status: number, message: string}> {
    try {
      const user = new User(Date.now(), name, email, cpf);
      await this.userRepository.save(user);
      return {
        status: 201,
        message: "User created successfully"
      };
    } catch (error: any) {
      console.error('Error creating user:', error.message);
      return {
        status: error.status,
        message: error.message
      };
    }
  }

  async getUserByCpf(cpf: string): Promise<User | null> {
    return this.userRepository.findByCpf(cpf);
  }
}
