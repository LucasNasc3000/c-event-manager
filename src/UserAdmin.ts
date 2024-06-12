import { prisma } from '../lib/prisma';

export class UserAdmin {
  private adminUsername: string;
  private adminPassword: string;

  private constructor(adminUsername: string, adminPassword: string) {
    this.adminUsername = adminUsername;
    this.adminPassword = adminPassword;
  }

  private async findAdmin() {
    const admExists = await prisma.employee.findUnique({
      where: {
        email: this.adminUsername,
        password: this.adminPassword,
      },
    });

    if (admExists === null) {
      return null;
    }

    return admExists;
  }

  private async Create() {
    const admExists = await this.findAdmin();
    if (admExists === null) {
      const createAdmin = await prisma.employee.create({
        data: {
          name: 'adm@30001',
          email: this.adminUsername,
          password: this.adminPassword,
        },
      });
      return createAdmin;
    }
    return 'Admin já existente';
  }

  static async CreateAdmin(adminUsername: string, adminPassword: string) {
    try {
      const admin = new UserAdmin(adminUsername, adminPassword);
      const admExists = await admin.findAdmin();

      if (admExists !== null) {
        return admExists.email;
      }

      await admin.Create();
      return 'Administrador criado';
    } catch (e) {
      console.log(e);
    }
  }

  static async adminLogin(adminUsername: string, adminPassword: string) {
    const admin = new UserAdmin(adminUsername, adminPassword);
    const admExists = await admin.findAdmin();

    if (admExists !== null) {
      const verify = await admin.adminVerify();

      if (verify === false) {
        return console.log('Usuario ou senha invalidos');
      }

      await prisma.adminLogin.create({
        data: {
          adminUser: admin.adminUsername,
          adminPassword: admin.adminPassword,
        },
      });
    } else {
      return console.log('O usuario administrador ainda nao foi criado');
    }
  }

  static async adminLogout(adminUsername: string, adminPassword: string) {
    const admin = new UserAdmin(adminUsername, adminPassword);
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
}
