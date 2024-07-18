/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import dotenv from 'dotenv';
import { Employee } from './Employee';
import { UserAdmin } from './UserAdmin';
import { UserAbstract } from './interfaces/UserAbstract';

dotenv.config();

export class UserFactory implements UserAbstract {
  private _name: string = '';
  private _password: string = '';
  private _email: string = '';
  private _id: string = '';
  private empl: Employee = new Employee();

  constructor(
    email: string = '',
    password: string = '',
    name: string = '',
    id: string = '',
  ) {
    this._email = email;
    this._password = password;
    this._name = name;
    this._id = id;
  }
  Create(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  List(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  Update(id: string, data: string[]): Promise<void | null> {
    throw new Error('Method not implemented.');
  }
  Logout(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async UserCreate() {
    const fieldsCheck = this.fieldsCheck();

    if (fieldsCheck === false) {
      return console.log('Email, nome ou senha nao foram preenchidos');
    }

    if (this._name !== 'adm@30001') {
      const empl = new Employee(this._name, this._email, this._password);
      const emplCreate = await empl.Create();
      return emplCreate;
    }
    const admin = await UserAdmin.CreateAdmin(this._email, this._password);
    return admin;
  }

  public async Login() {
    if (
      this._email[0] === 'a' &&
      this._email[1] === 'd' &&
      this._email[2] === 'm'
    ) {
      return UserAdmin.adminLogin(this._email, this._password);
    }

    const empl = new Employee('', this._email, this._password);
    const employeeLogin = empl.Login();
    return employeeLogin;
  }

  public async adminLogout() {
    UserAdmin.adminLogout();
  }

  public async employeeLogout() {
    const empl = new Employee('', this._email);
    return empl.Logout();
  }

  public async employeesList() {
    const emplList = await this.empl.List();
    return emplList;
  }

  public async employeeUpdate(id: string, data: string[]) {
    if (typeof id === 'undefined' || id === '' || id === null) {
      return 'id nao informado';
    }
    const emplUpdate = await this.empl.Update(id, data);
    return emplUpdate;
  }

  public async Delete(id: string) {
    await this.empl.Delete(id);
  }

  public async Search(searchValue: string) {
    const alphabetRegex = /^[a-zA-Z]+$/;
    if (searchValue === '') {
      return console.log('Dado nao informado');
    }

    if (searchValue.includes('@') || searchValue.includes('.com')) {
      await this.empl.searchByEmail(searchValue);
    } else if (alphabetRegex.test(searchValue)) {
      await this.empl.searchByName(searchValue);
    } else {
      const searchId = await this.empl.searchById(searchValue);

      if (searchId === null) {
        return console.log(
          `Funcionario de id: ${searchValue} inexistente ou o dado de busca foi informado incorretamente.`,
        );
      }
    }
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
