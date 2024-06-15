import dotenv from 'dotenv';
import { prisma } from '../lib/prisma';

dotenv.config();

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
    try {
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
    } catch (e) {
      return console.log(e);
    }
  }

  static async adminLogout(adminUsername: string, adminPassword: string) {
    try {
      const admin = new UserAdmin(adminUsername, adminPassword);
      const admVerify = admin.adminVerify(adminUsername, adminPassword);
      const adminData = await admin.findAdmin();

      if (admVerify !== true) {
        return console.log('Usuario ou senha incorretos');
      }

      if (adminData !== null) {
        await prisma.adminLogin.delete({
          where: {
            adminUser: adminData.email,
          },
        });
      } else {
        return console.log('O administrador nao foi cadastrado');
      }
    } catch (e) {
      console.log(e);
    }
  }

  private adminVerify(adminUsername: string, adminPassword: string): boolean {
    if (
      adminUsername === 'adm@mail.com' &&
      adminPassword === 'Dont_Forget_A_Senha!_'
    ) {
      return true;
    } else {
      return false;
    }
  }
}
