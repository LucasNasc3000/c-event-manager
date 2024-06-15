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

  private async adminLoginVerify() {
    const adminVerify = await prisma.employee.findUnique({
      where: {
        name: 'adm@30001',
      },
    });

    const adminLoginVerify = await prisma.adminLogin.findUnique({
      where: {
        adminUser: 'adm@30001',
      },
    });

    if (
      adminVerify?.name === 'adm@30001' &&
      adminLoginVerify?.adminUser === 'adm@30001'
    ) {
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

      return createEmployee;
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

  public async Update(id: string) {
    const findEmployee = await prisma.employee.findUnique({
      where: {
        id: id,
      },
    });

    if (!findEmployee) {
      return console.log(`Funcionario ${id} nao encontrado`);
    }

    const udpateEmployee = await prisma.employee.update({
      where: {
        id: id,
      },

      data: {
        email: this._email,
        name: this._name,
      },
    });

    return console.table(
      `Dados do funcionario ${id} atualizados: \n${udpateEmployee}`,
    );
  }

  public async Delete(id: string) {
    const deleteEmployee = await prisma.employee.delete({
      where: {
        id: id,
      },
    });

    return console.log(`Funcionario ${deleteEmployee.id} deletado`);
  }
}
