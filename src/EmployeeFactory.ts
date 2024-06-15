/* eslint-disable prefer-const */
import dotenv from 'dotenv';
import { Employee } from './Employee';
import { UserAdmin } from './UserAdmin';

dotenv.config();

export class UserFactory {
  private _name: string = '';
  private _password: string = '';
  private _email: string = '';

  constructor(name: string = '', password: string = '', email: string = '') {
    this._name = name;
    this._password = password;
    this._email = email;
  }

  public async UserCreate() {
    const fieldsCheck = this.fieldsCheck();

    if (fieldsCheck === true) {
      return console.log('Email, nome ou senha nao foram preenchidos');
    }

    if (
      this._name !== 'adm@mail.com' &&
      this._password !== 'Dont_Forget_A_Senha!_'
    ) {
      const empl = new Employee(this._name, this._email, this._password);
      const emplCreate = await empl.Create();
      return emplCreate;
    }
    const admin = await UserAdmin.CreateAdmin(this._name, this._password);
    return admin;
  }

  public async Login() {
    if (
      this._name === 'adm@mail.com' &&
      this._password === 'Dont_Forget_A_Senha!_'
    ) {
      UserAdmin.adminLogin(this._name, this._password);
      return 'Administrador logado com sucesso';
    }
  }

  public async Logout() {
    UserAdmin.adminLogout(this._name, this._password);
    console.log('Administrador deslogado');
  }

  public async employeesList() {
    const empl = new Employee();
    const emplList = await empl.EmployeeList();
    return emplList;
  }

  private fieldsCheck(): boolean {
    const fields: string[] = [this._name, this._email, this._password];

    for (let i = 0; i < fields.length; i++) {
      if (fields[i] !== '') {
        return true;
      }

      if (fields[i] !== null) {
        return true;
      }

      if (typeof fields[i] !== 'undefined') {
        return true;
      }
    }
    return false;
  }
}
