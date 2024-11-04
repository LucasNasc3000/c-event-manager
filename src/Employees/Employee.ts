import { prisma } from '../../lib/prisma';
import { UserAbstract } from '../interfaces/UserAbstract';
import { DateTime } from '../utils/DateTime';
import { LogFactory } from '../Logs/LogFactory';
import { EmployeeSearchFilter } from './EmployeeSearchFilter';
import { EmployeeSearch } from './EmployeeSearch';
import { EmployeeLoginVerify } from '../LoginVerify/EmployeeLoginVerify';
import { Auth, AuthResult } from '../interfaces/Auth';
import { AdminLoginVerify } from '../LoginVerify/AdminLoginVerify';
import { VerifyResult } from '../LoginVerify/VerifyResult';
import { PasswordHash } from './PasswordHash';

export class Employee implements UserAbstract {
  constructor(
    private _name: string = '',
    private _email: string = '',
    private _password: string = '',
    public _adminLoginVerify: Auth,
    public _verifyResult: AuthResult,
  ) {}

  public async Create() {
    try {
      const admLoginVerify = await this._adminLoginVerify.Verify();
      this._verifyResult.Result(null, admLoginVerify);

      const passwordHash: PasswordHash = new PasswordHash(this._password);
      const createHash = await passwordHash.Hash();

      if (typeof createHash === 'string') {
        const createEmployee = await prisma.employee.create({
          data: {
            name: this._name,
            email: this._email,
            password: createHash,
          },
        });

        return console.table(createEmployee);
      }

      return console.log('A senha deve ser uma string. Erro de hash');
    } catch (e) {
      return console.log(e);
    }
  }

  public async List() {
    try {
      const admLoginVerify = await this._adminLoginVerify.Verify();
      this._verifyResult.Result(null, admLoginVerify);

      const employeesList = await prisma.employee.findMany();

      if (employeesList.length < 1) {
        return console.log(
          'Ocorreu um erro ou não há funcionários cadastrados',
        );
      }

      return console.table(employeesList);
    } catch (e) {
      return console.log(e);
    }
  }

  public async Update(id: string, data: string[]) {
    try {
      const admLoginVerify = await this._adminLoginVerify.Verify();
      this._verifyResult.Result(null, admLoginVerify);

      const admVerify: AdminLoginVerify = new AdminLoginVerify();
      const admVerifyResult: VerifyResult = new VerifyResult();

      const employeeNewData: EmployeeSearch = new EmployeeSearch(
        admVerify,
        admVerifyResult,
      );
      await employeeNewData.SearchById(id, false);

      await prisma.employee.update({
        where: {
          id: id,
        },

        data: {
          email: data[0],
          name: data[1],
        },
      });

      const showEmployeeNewData: EmployeeSearch = new EmployeeSearch(
        admVerify,
        admVerifyResult,
      );

      const employeeSearchFilter = new EmployeeSearchFilter(
        'id',
        id,
        showEmployeeNewData,
      );

      employeeSearchFilter.Filter();
    } catch (e) {
      return console.log(e);
    }
  }

  public async Delete(id: string) {
    try {
      const admLoginVerify = await this._adminLoginVerify.Verify();
      this._verifyResult.Result(null, admLoginVerify);

      const admVerify: AdminLoginVerify = new AdminLoginVerify();
      const admVerifyResult: VerifyResult = new VerifyResult();

      const employeeSearch: EmployeeSearch = new EmployeeSearch(
        admVerify,
        admVerifyResult,
      );
      await employeeSearch.SearchById(id, false);

      const deleteEmployee = await prisma.employee.delete({
        where: {
          id: id,
        },
      });

      return console.log(`Funcionario ${deleteEmployee.id} deletado`);
    } catch (e) {
      return console.log(e);
    }
  }

  public async Login() {
    try {
      const admLoginVerify = await this._adminLoginVerify.Verify();
      const employeeLoginVerify = new EmployeeLoginVerify();
      const verify = await employeeLoginVerify.Verify();

      if (admLoginVerify === true) {
        return console.log(
          'Login nao autorizado enquanto o administrador estiver logado',
        );
      }

      if (typeof verify === 'string') {
        return console.log(
          `Erro: o funcionário ${employeeLoginVerify} já está logado`,
        );
      }

      const employeeVerify = await prisma.employee.findUnique({
        where: {
          email: this._email,
        },
      });

      if (!employeeVerify) return console.log('Funcionario não registrado');

      const passwordHash: PasswordHash = new PasswordHash(
        employeeVerify.password,
      );
      const hashCompare = await passwordHash.Compare(this._password);

      if (hashCompare !== true) return console.log('Senha incorreta');

      await prisma.userLogin.create({
        data: {
          userEmail: this._email,
          userPassword: this._password,
        },
      });

      const logLogin = new LogFactory(true, '', '', DateTime(), this._email);
      await logLogin.Create();
      return console.log(`Funcionario ${this._email} logado com sucesso.`);
    } catch (e) {
      return console.log(e);
    }
  }

  public async Logout() {
    try {
      await prisma.userLogin.delete({
        where: {
          userEmail: this._email,
        },
      });

      const logLogout = new LogFactory(false, '', '', DateTime(), this._email);
      await logLogout.Create();
      return console.log(`Funcionario ${this._email} deslogado.`);
    } catch (e) {
      return console.log(e);
    }
  }
}
