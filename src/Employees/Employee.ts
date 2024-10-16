import dotenv from 'dotenv';
import { prisma } from '../../lib/prisma';
import { UserAbstract } from '../interfaces/UserAbstract';
import { DateTime } from '../utils/DateTime';
import { Logs } from '../Logs/Logs';
import { EmployeeSearch } from './EmployeeSearch';
import { AdminLoginVerify } from '../LoginVerify/AdminLoginVerify';

dotenv.config();

export class Employee implements UserAbstract {
  private _name: string = '';
  private _email: string = '';
  private _password: string = '';
  private employeeSearch: EmployeeSearch = new EmployeeSearch();
  private adminLoginVerify: AdminLoginVerify = new AdminLoginVerify();
  private errorMsg: string =
    'Operacao nao autorizada. Login do administrador necessario';

  constructor(name: string = '', email: string = '', password: string = '') {
    this._name = name;
    this._email = email;
    this._password = password;
  }

  private async EmployeeLoginVerify() {
    try {
      const empLogin = await prisma.userLogin.findMany();

      if (empLogin.length > 0) {
        const employeeLoginVerify = empLogin.map((emp) => {
          return emp.userEmail;
        });

        return employeeLoginVerify[0];
      }

      return false;
    } catch (e) {
      return console.log(e);
    }
  }

  public async Create() {
    try {
      const admLoginVerify = await this.adminLoginVerify.Verify();
      if (admLoginVerify === false) return console.log(this.errorMsg);

      const createEmployee = await prisma.employee.create({
        data: {
          name: this._name,
          email: this._email,
          password: this._password,
        },
      });

      return console.table(createEmployee);
    } catch (e) {
      console.log(e);
    }
  }

  public async List() {
    try {
      const admLoginVerify = await this.adminLoginVerify.Verify();
      if (admLoginVerify === false) return console.log(this.errorMsg);

      const employeesList = await prisma.employee.findMany();

      if (employeesList.length < 1) {
        return console.log(
          'Ocorreu um erro ou não há funcionários cadastrados',
        );
      }

      return console.table(employeesList);
    } catch (e) {
      console.log(e);
    }
  }

  public async Update(id: string, data: string[]) {
    try {
      const admLoginVerify = await this.adminLoginVerify.Verify();
      if (admLoginVerify === false) return console.log(this.errorMsg);

      const findEmployee = await prisma.employee.findUnique({
        where: {
          id: id,
        },
      });

      if (!findEmployee) {
        return console.log(`Funcionario ${id} nao encontrado`);
      }

      await prisma.employee.update({
        where: {
          id: id,
        },

        data: {
          email: data[0],
          name: data[1],
        },
      });

      const updateCheck = await this.employeeSearch.SearchById(id);

      return updateCheck;
    } catch (e) {
      return console.log(e);
    }
  }

  public async Delete(id: string) {
    try {
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
      const admLoginVerify = await this.adminLoginVerify.Verify();
      const employeeLoginVerify = await this.EmployeeLoginVerify();
      if (admLoginVerify === true) {
        return console.log(
          'Login nao autorizado enquanto o administrador estiver logado',
        );
      }

      if (typeof employeeLoginVerify === 'string') {
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

      if (employeeVerify?.password !== this._password) {
        return console.log('Senha incorreta');
      }

      await prisma.userLogin.create({
        data: {
          userEmail: this._email,
          userPassword: this._password,
        },
      });

      const logLogin = new Logs(this._email, DateTime());
      await logLogin.CreateLogin();
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

      const logLogout = new Logs(this._email, DateTime());
      await logLogout.CreateLogout();
      return console.log(`Funcionario ${this._email} deslogado.`);
    } catch (e) {
      return console.log(e);
    }
  }
}
