import { prisma } from '../lib/prisma';

export class Employee {
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
  private adminEmail: string;
  private adminPassword: string;

  private constructor(adminEmail: string, adminPassword: string) {
    this.adminEmail = adminEmail;
    this.adminPassword = adminPassword;
  }

  private async findAdmin() {
    const admExists = await prisma.employee.findUnique({
      where: {
        email: this.adminEmail,
        password: this.adminPassword,
      },
    });

    if (admExists === null) {
      return null;
    }

    return admExists;
  }

  private async Create() {
    const admExists = this.findAdmin();
    if (admExists === null) {
      const createAdmin = await prisma.employee.create({
        data: {
          name: 'admin@User',
          email: this.adminEmail,
          password: this.adminPassword,
        },
      });
      console.log('Administrador criado: \n');
      console.table(`${createAdmin.email}`);
    }
    return 'Admin já existente';
  }

  static async CreateAdmin(adminEmail: string, adminPassword: string) {
    const admin = new UserAdmin(adminEmail, adminPassword);
    const admExists = await admin.findAdmin();

    if (admExists !== null) {
      return console.log(admin.adminEmail);
    }

    await admin.Create();
    return console.log('Administrador criado');
  }

  static async adminLogin(adminEmail: string, adminPassword: string) {
    const admin = new UserAdmin(adminEmail, adminPassword);
    const admExists = await admin.findAdmin();

    if (admExists !== null) {
      const verify = await admin.adminVerify();

      if (verify === false) {
        return console.log('Usuario ou senha invalidos');
      }

      await prisma.adminLogin.create({
        data: {
          adminUser: admin.adminEmail,
          adminPassword: admin.adminPassword,
        },
      });
    } else {
      return console.log('O usuario administrador ainda nao foi criado');
    }
  }

  static async adminLogout(adminEmail: string, adminPassword: string) {
    const admin = new UserAdmin(adminEmail, adminPassword);
    const admExists = await admin.findAdmin();

    if (admExists !== null) {
      const loggedAdmin = await prisma.adminLogin.count({
        where: {
          id: admExists.id,
        },
      });

      if (loggedAdmin > 0) {
        await prisma.adminLogin.delete({
          where: {
            id: admExists.id,
          },
        });
      }
    } else {
      return console.log('O administrador nao foi cadastrado');
    }
  }

  private async adminVerify() {
    const admExists = await this.findAdmin();
    if (
      admExists?.email === process.env.ADMIN_USER &&
      admExists?.password === process.env.ADMIN_PASS
    ) {
      return true;
    } else {
      return false;
    }
  }

  private async adminLoginVerify() {
    const admExists = await this.findAdmin();

    if (admExists !== null) {
      const findAdminLogin = await prisma.adminLogin.count({
        where: {
          id: admExists.id,
        },
      });

      if (findAdminLogin <= 0) {
        return console.log('Login do administrador necessario');
      }
    }

    if (
      admExists?.email === process.env.ADMIN_USER &&
      admExists?.password === process.env.ADMIN_PASS
    ) {
      return true;
    } else {
      false;
    }
  }
}
