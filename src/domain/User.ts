export class User {
  constructor(
    public id: number,
    public name: string,
    private _email: string,
    private _cpf: string
  ) {
    this.setCpf(_cpf);
    this.setEmail(_email);
  }

  get cpf(): string {
    return this._cpf;
  }

  private setCpf(cpf: string): void {
    if (!this.isValidCpfFormat(cpf)) {
      throw new Error('Invalid CPF format');
    }
    this._cpf = cpf;
  }

  private isValidCpfFormat(cpf: string): boolean {
    return /^\d{11}$/.test(cpf);
  }

  get email(): string {
    return this._email;
  }

  private isValidEmailFormat(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private setEmail(email: string): void {
    if (!this.isValidEmailFormat(email)) {
      throw new Error('Invalid email format');
    }
    this._email = email;
  }
}