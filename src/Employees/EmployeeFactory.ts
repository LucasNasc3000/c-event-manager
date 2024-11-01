import { Employee } from './Employee';
import { EmployeeSearchFilter } from './EmployeeSearchFilter';
import { UserAdmin } from './UserAdmin';
import { UserAbstract } from '../interfaces/UserAbstract';
import { AdminLoginVerify } from '../LoginVerify/AdminLoginVerify';
import { VerifyResult } from '../LoginVerify/VerifyResult';
import { EmployeeSearch } from './EmployeeSearch';

export class EmployeeFactory implements UserAbstract {
  constructor(
    public _name: string = '',
    public _email: string = '',
    public _password: string = '',
  ) {}

  public async Create() {
    const admLoginVerify: AdminLoginVerify = new AdminLoginVerify();
    const verifyResult: VerifyResult = new VerifyResult();

    const fieldsCheck = this.FieldsCheck();

    if (fieldsCheck === false) {
      return console.log('Email, nome ou senha nao foram preenchidos');
    }

    if (!this._name.includes('adm')) {
      const empl = new Employee(
        this._name,
        this._email,
        this._password,
        admLoginVerify,
        verifyResult,
      );
      await empl.Create();
    }
    await UserAdmin.CreateAdmin(this._email, this._password);
  }

  public async Login() {
    const admLoginVerify: AdminLoginVerify = new AdminLoginVerify();
    const verifyResult: VerifyResult = new VerifyResult();

    if (this._email.includes('adm')) {
      return UserAdmin.AdminLogin(this._email, this._password);
    }

    const empl = new Employee(
      '',
      this._email,
      this._password,
      admLoginVerify,
      verifyResult,
    );
    const employeeLogin = empl.Login();
    return employeeLogin;
  }

  public async AdminLogout() {
    UserAdmin.AdminLogout();
  }

  public async Logout() {
    const admLoginVerify: AdminLoginVerify = new AdminLoginVerify();
    const verifyResult: VerifyResult = new VerifyResult();

    const empl = new Employee(
      '',
      this._email,
      '',
      admLoginVerify,
      verifyResult,
    );
    empl.Logout();
  }

  public async List() {
    const admLoginVerify: AdminLoginVerify = new AdminLoginVerify();
    const verifyResult: VerifyResult = new VerifyResult();

    const empl: Employee = new Employee(
      '',
      '',
      '',
      admLoginVerify,
      verifyResult,
    );
    await empl.List();
  }

  public async Update(id: string, data: string[]) {
    const admLoginVerify: AdminLoginVerify = new AdminLoginVerify();
    const verifyResult: VerifyResult = new VerifyResult();

    if (typeof id === 'undefined' || id === '' || id === null) {
      return 'id nao informado';
    }

    if (data.length < 1) return 'nenhum dado informado';

    const empl: Employee = new Employee(
      '',
      '',
      '',
      admLoginVerify,
      verifyResult,
    );

    await empl.Update(id, data);
  }

  public async Delete(id: string) {
    const admLoginVerify: AdminLoginVerify = new AdminLoginVerify();
    const verifyResult: VerifyResult = new VerifyResult();

    const empl: Employee = new Employee(
      '',
      '',
      '',
      admLoginVerify,
      verifyResult,
    );
    await empl.Delete(id);
  }

  public async Search(searchParam: string, searchValue: string) {
    const admVerify: AdminLoginVerify = new AdminLoginVerify();
    const admVerifyResult: VerifyResult = new VerifyResult();

    const employeeSearch: EmployeeSearch = new EmployeeSearch(
      admVerify,
      admVerifyResult,
    );

    const employeeSearchFilter: EmployeeSearchFilter = new EmployeeSearchFilter(
      searchParam,
      searchValue,
      employeeSearch,
    );

    await employeeSearchFilter.Filter();
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
