import dotenv from 'dotenv';
import { prisma } from '../lib/prisma';

dotenv.config();

export class Employee {
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

  public async adminLoginVerify() {
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
      const admLoginVerify = await this.adminLoginVerify();
      if (admLoginVerify === false) {
        return console.log(this.errorMsg);
      }

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

  public async EmployeeList() {
    try {
      const admLoginVerify = await this.adminLoginVerify();
      if (admLoginVerify === false) {
        return console.log(this.errorMsg);
      }

      const employeesList = await prisma.employee.findMany();
      return console.table(employeesList);
    } catch (e) {
      console.log(e);
    }
  }

  public async Update(id: string, data: string[]) {
    const admLoginVerify = await this.adminLoginVerify();
    if (admLoginVerify === false) {
      return console.log(this.errorMsg);
    }

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

    const updateCheck = await this.searchById(id);

    return updateCheck;
  }

  public async Delete(id: string) {
    const deleteEmployee = await prisma.employee.delete({
      where: {
        id: id,
      },
    });

    return console.log(`Funcionario ${deleteEmployee.id} deletado`);
  }

  public async searchById(id: string) {
    const admLoginVerify = await this.adminLoginVerify();
    if (admLoginVerify === false) {
      return console.log(this.errorMsg);
    }

    const findEmployee = await prisma.employee.findUnique({
      where: {
        id: id,
      },
    });

    if (!findEmployee) {
      return null;
    }

    return console.table(findEmployee);
  }

  public async searchByEmail(email: string) {
    const admLoginVerify = await this.adminLoginVerify();
    if (admLoginVerify === false) {
      return console.log(this.errorMsg);
    }

    const findEmployee = await prisma.employee.findUnique({
      where: {
        email: email,
      },
    });

    if (!findEmployee) {
      return console.log(`Funcionario ${email} nao encontrado`);
    }

    return console.table(findEmployee);
  }

  public async searchByName(name: string) {
    const admLoginVerify = await this.adminLoginVerify();
    if (admLoginVerify === false) {
      return console.log(this.errorMsg);
    }

    const findEmployee = await prisma.employee.findUnique({
      where: {
        name: name,
      },
    });

    if (!findEmployee) {
      return console.log(`Funcionario ${name} nao encontrado`);
    }

    return console.table(findEmployee);
  }
}
