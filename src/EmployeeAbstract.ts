import { prisma } from '../lib/prisma';

export abstract class Employee {
  protected _name: string;
  protected _email: string;
  protected _password: string;

  constructor(name: string, email: string, password: string) {
    this._name = name;
    this._email = email;
    this._password = password;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  set name(name: string) {
    this._name = name;
  }

  set email(email: string) {
    this._email = email;
  }

  protected async Create() {
    const createEmployee = await prisma.employee.create({
      data: {
        name: this._name,
        email: this._email,
        password: this._password,
      },
    });

    console.log('Funcionario criado: \n');
    console.table(`${(createEmployee.name, createEmployee.email)}`);
  }

  protected async EmployeeList() {
    const employeesList = await prisma.employee.findMany();

    return console.table(employeesList);
  }

  protected async Update(id: string) {
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

  protected async Delete(id: string) {
    const deleteEmployee = await prisma.employee.delete({
      where: {
        id: id,
      },
    });

    return console.log(`Funcionario ${deleteEmployee.id} deletado`);
  }
}

export class UserAdmin {
  private static adminExists: boolean;
  private adminEmail: string;
  private adminPassword: string;

  constructor(adminEmail: string, adminPassword: string) {
    this.adminEmail = adminEmail;
    this.adminPassword = adminPassword;
    this.findAdmin();
  }

  private async findAdmin() {
    const admExists = await prisma.employee.findUnique({
      where: {
        email: this.adminEmail,
        password: this.adminPassword,
      },
    });

    if (admExists === null) {
      UserAdmin.adminExists = false;
      return null;
    }

    UserAdmin.adminExists = true;
    return admExists;
  }

  private async Create() {
    const admExists = this.findAdmin();
    if (admExists === null) {
      const createAdmin = await prisma.adminLogin.create({
        data: {
          adminUser: this.adminEmail,
          adminPassword: this.adminPassword,
        },
      });
      console.log('Administrador criado: \n');
      console.table(`${createAdmin.adminUser}`);
    }
    return 'Admin já existente';
  }

  static async GetAdmin(adminEmail: string, adminPassword: string) {
    const admin = new UserAdmin(adminEmail, adminPassword);
    const admExists = await admin.findAdmin();

    if (admExists !== null) {
      return admin.adminEmail;
    }

    await admin.Create();
    return console.log('Administrador criado');
  }
}
