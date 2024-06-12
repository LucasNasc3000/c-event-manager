import dotenv from 'dotenv';
import { Employee } from './Employee';
import { UserAdmin } from './UserAdmin';

dotenv.config();

export class UserFactory {
  constructor(
    private _name: string,
    private _password: string,
    private _email?: string,
  ) {}

  get name(): string {
    return this._name;
  }

  get email(): string {
    if (this._email) {
      return this._email;
    }
    return 'email nao provido';
  }

  set name(name: string) {
    this._name = name;
  }

  set email(email: string) {
    this._email = email;
  }

  async UserClassesCall() {
    if (
      this._name !== process.env.ADMIN_USER &&
      this._password !== process.env.ADMIN_PASSWORD
    ) {
      const empl = new Employee(this._name, this.email, this._password);
      const emplCreate = await empl.Create();
      return emplCreate;
    }
    const admin = await UserAdmin.CreateAdmin(this._name, this._password);
    return admin;
  }

  async Login() {
    if (
      this._name === process.env.ADMIN_USER &&
      this._password === process.env.ADMIN_PASSWORD
    ) {
      UserAdmin.adminLogin(this._name, this._password);
      return 'Administrador logado com sucesso';
    }
  }

  async Logout() {
    UserAdmin.adminLogout(this._name, this._password);
    console.log('Administrador deslogado');
  }
}
