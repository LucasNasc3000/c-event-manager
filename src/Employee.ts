import dotenv from 'dotenv';
import { prisma } from '../lib/prisma';
import { UserAbstract } from './interfaces/UserAbstract';
import { DateTime } from './utils/DateTime';
import { Logs } from './Logs';

dotenv.config();

export class Employee implements UserAbstract {
  private _name: string = '';
  private _email: string = '';
  private _password: string = '';
  private errorMsg: string =
    'Operacao nao autorizada. Login do administrador necessario';

  constructor(name: string = '', email: string = '', password: string = '') {
    this._name = name;
    this._email = email;
    this._password = password;
  }

  public async AdminLoginVerify() {
    const admLogin = await prisma.adminLogin.findMany();

    if (admLogin.length <= 0) return false;

    const verifyAdminUser = admLogin.map((adm) => {
      return adm.adminUser;
    });

    const adminVerify = await prisma.employee.findUnique({
      where: {
        email: verifyAdminUser[0],
      },
    });

    if (adminVerify !== null && adminVerify.email === verifyAdminUser[0]) {
      return true;
    }
    return false;
  }

  public async Create() {
    try {
      const admLoginVerify = await this.AdminLoginVerify();
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
      const admLoginVerify = await this.AdminLoginVerify();
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
      const admLoginVerify = await this.AdminLoginVerify();
      if (admLoginVerify === false) return console.log(this.errorMsg);

      const findEmployee = await prisma.employee.findUnique({
        where: {
          id: id,
        },
      });

      if (!findEmployee) {
        return console.log(`Funcionario ${id} nao encontrado`);
      }

      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      const udpateEmployee = await prisma.employee.update({
        where: {
          id: id,
        },

        data: {
          email: data[0],
          name: data[1],
        },
      });

      const updateCheck = await this.SearchById(id);

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

  public async SearchById(id: string) {
    try {
      const admLoginVerify = await this.AdminLoginVerify();
      if (admLoginVerify === false) return console.log(this.errorMsg);

      const findEmployee = await prisma.employee.findUnique({
        where: {
          id: id,
        },
      });

      if (!findEmployee) {
        return console.log('Funcionário não encontrado');
      }

      return console.table(findEmployee);
    } catch (e) {
      console.log(e);
    }
  }

  public async SearchByEmail(email: string) {
    try {
      const admLoginVerify = await this.AdminLoginVerify();
      if (admLoginVerify === false) return console.log(this.errorMsg);

      const findEmployee = await prisma.employee.findUnique({
        where: {
          email: email,
        },
      });

      if (!findEmployee) {
        return console.log(`Funcionario com email "${email}" nao encontrado`);
      }

      return console.table(findEmployee);
    } catch (e) {
      return console.log(e);
    }
  }

  public async SearchByName(name: string) {
    try {
      const admLoginVerify = await this.AdminLoginVerify();
      if (admLoginVerify === false) return console.log(this.errorMsg);

      const findEmployee = await prisma.employee.findMany({
        where: {
          name: {
            startsWith: name,
          },
        },
      });

      if (findEmployee.length < 1) {
        return console.log(`Funcionarios com o nome "${name}" nao encontrados`);
      }

      return console.table(findEmployee);
    } catch (e) {
      return console.log(e);
    }
  }

  public async Login() {
    try {
      const admLoginVerify = await this.AdminLoginVerify();
      if (admLoginVerify === true) {
        return console.log(
          'Login nao autorizado enquanto o administrador estiver logado',
        );
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
