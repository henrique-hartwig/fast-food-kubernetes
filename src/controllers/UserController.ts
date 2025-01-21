import { UserUseCase } from '../usecases/UserUseCase';

export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  async createUser(req: any, res: any) {
    const { name, email, cpf } = req.body;
    const result = await this.userUseCase.createUser(name, email, cpf);
    res.status(result.status).json({ message: result.message });
  }

  async getUserByCpf(req: any, res: any) {
    const user = await this.userUseCase.getUserByCpf(req.params.cpf);
    return user ? res.status(200).json(user) : res.status(404).json({ message: 'User not found' });
  }
}
