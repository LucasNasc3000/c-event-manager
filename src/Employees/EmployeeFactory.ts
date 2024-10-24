/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import dotenv from 'dotenv';
import { Employee } from './Employee';
import { EmployeeSearch } from './EmployeeSearch';
import { UserAdmin } from './UserAdmin';
import { UserAbstract } from '../interfaces/UserAbstract';
import { Logs } from '../Logs/Logs';

dotenv.config();

export class EmployeeFactory implements UserAbstract {
  private _name: string = '';
  private _password: string = '';
  private _email: string = '';
  private empl: Employee = new Employee();
  private employeeSearch: EmployeeSearch = new EmployeeSearch();
  private log: Logs = new Logs();

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

  public async Search(searchValue: string) {
    const alphabetRegex = /^[a-zA-Z]+$/;
    if (searchValue === '') return console.log('Dado nao informado');

    if (searchValue.includes('@') || searchValue.includes('.com')) {
      await this.employeeSearch.SearchByEmail(searchValue);
    } else if (alphabetRegex.test(searchValue)) {
      await this.employeeSearch.SearchByName(searchValue);
    } else {
      const searchId = await this.employeeSearch.SearchById(searchValue);

      if (searchId === null) {
        return console.log(
          `Funcionario de id: ${searchValue} inexistente ou o dado de busca foi informado incorretamente.`,
        );
      }
    }
  }

  public async LogSearchEmail(emailSearchValue: string) {
    this.log.LogSearchEmail(emailSearchValue);
  }

  public async LogSearchDate(dateSearchValue: string) {
    this.log.LogSearchDate(dateSearchValue);
  }

  public async LogSearchHour(hourSearchValue: string) {
    this.log.LogSearchHour(hourSearchValue);
  }

  public async LogoutSearchEmail(emailSearchValue: string) {
    this.log.LogoutSearchEmail(emailSearchValue);
  }

  public async LogoutSearchDate(dateSearchValue: string) {
    this.log.LogoutSearchDate(dateSearchValue);
  }

  public async LogoutSearchHour(hourSearchValue: string) {
    this.log.LogoutSearchHour(hourSearchValue);
  }

  public async LogsList() {
    this.log.ListLogins();
  }

  public async LogoutsList() {
    this.log.ListLogouts();
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
