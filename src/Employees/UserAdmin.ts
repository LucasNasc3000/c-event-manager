import { prisma } from '../../lib/prisma';
import { DateTime } from '../utils/DateTime';
import { LogFactory } from '../Logs/LogFactory';

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
      return console.log('Erro ao buscar administrador');
    }
  }

  private async IsLogged() {
    try {
      const admExists = await prisma.adminLogin.findUnique({
        where: {
          adminUser: this.adminEmail,
        },
      });

      if (admExists === null) return null;

      return admExists;
    } catch (e) {
      return console.log('Erro ao verificar se o administrador já está logado');
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
      return console.log('Erro ao criar administrador');
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
      return console.log('Erro ao criar novo administrador');
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

        const logLogin = new LogFactory(
          true,
          '',
          '',
          DateTime(),
          admExists.email,
        );
        await logLogin.Create();
        return console.log('Administrador logado com sucesso');
      }
    } catch (e) {
      return console.log('Erro ao logar como administrador');
    }
  }

  static async AdminLogout() {
    try {
      const adminData = await prisma.adminLogin.findMany();
      const adminEmail: string[] = [];

      adminData.map((data) => {
        adminEmail.push(data.adminUser);
      });

      await prisma.adminLogin.deleteMany();

      const logLogout = new LogFactory(
        false,
        '',
        '',
        DateTime(),
        adminEmail[0],
      );
      await logLogout.Create();

      return console.log('Administrador deslogado');
    } catch (e) {
      console.log('Erro ao realizar logout como administrador');
    }
  }
}
