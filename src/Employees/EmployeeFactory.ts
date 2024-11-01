/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import { Employee } from './Employee';
import { EmployeeSearchFilter } from './EmployeeSearchFilter';
import { UserAdmin } from './UserAdmin';
import { UserAbstract } from '../interfaces/UserAbstract';

export class EmployeeFactory implements UserAbstract {
  private _name: string = '';
  private _password: string = '';
  private _email: string = '';

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

    if (!this._name.includes('adm')) {
      const empl = new Employee(this._name, this._email, this._password);
      await empl.Create();
    }
    await UserAdmin.CreateAdmin(this._email, this._password);
  }

  public async Login() {
    if (this._email.includes('adm')) {
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
    const empl: Employee = new Employee();
    await empl.List();
  }

  public async EmployeeUpdate(id: string, data: string[]) {
    if (typeof id === 'undefined' || id === '' || id === null) {
      return 'id nao informado';
    }

    if (data.length < 1) return 'nenhum dado informado';

    const empl: Employee = new Employee();

    await empl.Update(id, data);
  }

  public async Delete(id: string) {
    const empl: Employee = new Employee();
    await empl.Delete(id);
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
      if (fields[i] !== '') return true;

      if (fields[i] !== null) return true;

      if (typeof fields[i] !== 'undefined') return true;
    }
    return false;
  }
}
