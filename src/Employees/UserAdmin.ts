import dotenv from 'dotenv';
import { prisma } from '../../lib/prisma';
import { DateTime } from '../utils/DateTime';
import { Logs } from '../Logs/Logs';

dotenv.config();

export class UserAdmin {
  private adminEmail: string;
  private adminPassword: string;

  private constructor(adminEmail: string, adminPassword: string) {
    this.adminEmail = adminEmail;
    this.adminPassword = adminPassword;
  }

  private async FindAdmin() {
    try {
      const admExists = await prisma.employee.findUnique({
        where: {
          email: this.adminEmail,
        },
      });

      if (admExists === null) {
        return console.log('Administrador não encontrado');
      }

      return admExists;
    } catch (e) {
      return console.log(e);
    }
  }

  private async IsLogged() {
    try {
      const admExists = await prisma.adminLogin.findUnique({
        where: {
          adminUser: this.adminEmail,
        },
      });

      if (admExists === null) {
        return null;
      }

      return admExists;
    } catch (e) {
      return console.log(e);
    }
  }

  private async Create() {
    try {
      const admExists = await this.FindAdmin();
      if (admExists === null) {
        await prisma.employee.create({
          data: {
            name: 'adm@30001',
            email: this.adminEmail,
            password: this.adminPassword,
          },
        });
      }
      return console.log('Administrador ja cadastrado');
    } catch (e) {
      return console.log(e);
    }
  }

  static async CreateAdmin(adminEmail: string, adminPassword: string) {
    try {
      const admin = new UserAdmin(adminEmail, adminPassword);
      const admExists = await admin.FindAdmin();

      if (admExists) return admExists.email;

      await admin.Create();
      return 'Administrador criado';
    } catch (e) {
      console.log(e);
    }
  }

  static async AdminLogin(adminEmail: string, adminPassword: string) {
    try {
      const admin = new UserAdmin(adminEmail, adminPassword);
      const admExists = await admin.FindAdmin();
      const isLogged = await admin.IsLogged();

      if (admExists) {
        if (isLogged !== null) {
          return console.log('Administrador com login ja ativo');
        }

        if (admExists.password !== adminPassword) {
          return console.log('Senha incorreta');
        }

        await prisma.adminLogin.create({
          data: {
            adminUser: admExists.email,
            adminPassword: admExists.password,
          },
        });

        const logLogin = new Logs(admExists.email, DateTime());
        await logLogin.CreateLogin();
        return console.log('Administrador logado com sucesso');
      }
    } catch (e) {
      return console.log(e);
    }
  }

  static async AdminLogout() {
    try {
      await prisma.adminLogin.deleteMany();
      return console.log('Administrador deslogado');
    } catch (e) {
      console.log(e);
    }
  }
}
