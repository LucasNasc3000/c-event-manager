/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import dotenv from 'dotenv';
import { Employee } from './Employee';
import { EmployeeSearchFilter } from './EmployeeSearchFilter';
import { UserAdmin } from './UserAdmin';
import { UserAbstract } from '../interfaces/UserAbstract';

dotenv.config();

export class EmployeeFactory implements UserAbstract {
  private _name: string = '';
  private _password: string = '';
  private _email: string = '';
  private empl: Employee = new Employee();

  constructor(email: string = '', password: string = '', name: string = '') {
    this._email = email;
    this._password = password;
    this._name = name;
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
    const fieldsCheck = this.FieldsCheck();

    if (fieldsCheck === false) {
      return console.log('Email, nome ou senha nao foram preenchidos');
    }

    if (this._name !== 'adm@30001') {
      const empl = new Employee(this._name, this._email, this._password);
      await empl.Create();
    }
    await UserAdmin.CreateAdmin(this._email, this._password);
  }

  public async Login() {
    if (
      this._email[0] === 'a' &&
      this._email[1] === 'd' &&
      this._email[2] === 'm'
    ) {
      return UserAdmin.AdminLogin(this._email, this._password);
    }

    const empl = new Employee('', this._email, this._password);
    const employeeLogin = empl.Login();
    return employeeLogin;
  }

  public async AdminLogout() {
    UserAdmin.AdminLogout();
  }

  public async EmployeeLogout() {
    const empl = new Employee('', this._email);
    empl.Logout();
  }

  public async EmployeesList() {
    await this.empl.List();
  }

  public async EmployeeUpdate(id: string, data: string[]) {
    if (typeof id === 'undefined' || id === '' || id === null) {
      return 'id nao informado';
    }

    if (data.length < 1) return 'nenhum dado informado';

    await this.empl.Update(id, data);
  }

  public async Delete(id: string) {
    await this.empl.Delete(id);
  }

  public async Search(searchParam: string, searchValue: string) {
    const employeeSearch: EmployeeSearchFilter = new EmployeeSearchFilter(
      searchParam,
      searchValue,
    );

    await employeeSearch.Filter();
  }

  private FieldsCheck(): boolean {
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
