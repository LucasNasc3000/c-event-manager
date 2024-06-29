/* eslint-disable prefer-const */
import dotenv from 'dotenv';
import { Employee } from './Employee';
import { UserAdmin } from './UserAdmin';

dotenv.config();

export class UserFactory {
  private _name: string = '';
  private _password: string = '';
  private _email: string = '';
  private _id: string = '';

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
      UserAdmin.adminLogin(this._email, this._password);
    }
  }

  public async Logout() {
    UserAdmin.adminLogout();
    console.log('Usuario deslogado');
  }

  public async employeesList() {
    const empl = new Employee();
    const emplList = await empl.EmployeeList();
    return emplList;
  }

  public async employeeUpdate(data: string[]) {
    if (
      typeof this._id === 'undefined' ||
      this._id === '' ||
      this._id === null
    ) {
      return 'id nao informado';
    }
    const empl = new Employee();
    const emplUpdate = await empl.Update(this._id, data);
    return emplUpdate;
  }

  public async Delete(id: string) {
    const empl = new Employee();
    await empl.Delete(id);
  }

  public async Search(searchValue: string) {
    const empl = new Employee();
    const alphabetRegex = /^[a-zA-Z]+$/;
    if (searchValue === '') {
      return console.log('Dado nao informado');
    }

    if (searchValue.includes('@') || searchValue.includes('.com')) {
      await empl.searchByEmail(searchValue);
    } else if (alphabetRegex.test(searchValue)) {
      await empl.searchByName(searchValue);
    } else {
      const searchId = await empl.searchById(searchValue);

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
