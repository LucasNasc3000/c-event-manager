import dotenv from 'dotenv';
import { prisma } from '../lib/prisma';

dotenv.config();

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
    const admExists = await this.findAdmin();
    if (admExists === null) {
      const createAdmin = await prisma.employee.create({
        data: {
          name: 'adm@30001',
          email: this.adminEmail,
          password: this.adminPassword,
        },
      });
      return createAdmin;
    }
    return 'Admin já existente';
  }

  static async CreateAdmin(adminEmail: string, adminPassword: string) {
    try {
      const admin = new UserAdmin(adminEmail, adminPassword);
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

  static async adminLogin(adminEmail: string, adminPassword: string) {
    try {
      const admin = new UserAdmin(adminEmail, adminPassword);
      const admExists = await admin.findAdmin();

      if (admExists !== null) {
        await prisma.adminLogin.create({
          data: {
            adminUser: admExists.email,
            adminPassword: admExists.password,
          },
        });
        return console.log('Administrador logado com sucesso');
      } else {
        return 'Usuario ou senha incorretos';
      }
    } catch (e) {
      return console.log(e);
    }
  }

  static async adminLogout() {
    try {
      await prisma.adminLogin.deleteMany();
    } catch (e) {
      console.log(e);
    }
  }
}
