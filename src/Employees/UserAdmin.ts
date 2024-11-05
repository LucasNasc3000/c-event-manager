import { prisma } from '../../lib/prisma';
import { DateTime } from '../utils/DateTime';
import { LogFactory } from '../Logs/LogFactory';
import { PasswordHash } from './PasswordHash';

export class UserAdmin {
  private name: string;
  private adminEmail: string;
  private adminPassword: string;

  private constructor(name: string, adminEmail: string, adminPassword: string) {
    this.name = name;
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

      if (admExists === null) return null;

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
      const passwordHash: PasswordHash = new PasswordHash(this.adminPassword);
      const createHash = await passwordHash.Hash();

      if (admExists === null) {
        if (typeof createHash === 'string') {
          await prisma.employee.create({
            data: {
              name: this.name,
              email: this.adminEmail,
              password: createHash,
            },
          });

          return;
        } else {
          return console.log(
            'Erro ao criar admin. A senha precisa ser uma string',
          );
        }
      }

      return console.log('Administrador ja cadastrado');
    } catch (e) {
      return console.log('Erro ao criar administrador');
    }
  }

  static async CreateAdmin(
    name: string,
    adminEmail: string,
    adminPassword: string,
  ) {
    try {
      const admin = new UserAdmin(name, adminEmail, adminPassword);
      const admExists = await admin.FindAdmin();

      if (admExists) return admExists.email;

      await admin.Create();
      return 'Administrador criado';
    } catch (e) {
      return console.log('Erro ao criar novo administrador');
    }
  }

  static async AdminLogin(
    name: string,
    adminEmail: string,
    adminPassword: string,
  ) {
    try {
      const admin = new UserAdmin(name, adminEmail, adminPassword);
      const admExists = await admin.FindAdmin();
      const isLogged = await admin.IsLogged();

      if (admExists) {
        if (isLogged !== null) {
          return console.log('Administrador com login ja ativo');
        }

        const passwordHash: PasswordHash = new PasswordHash(adminPassword);
        const compareHash = await passwordHash.Compare(admExists.password);

        if (compareHash !== true) return console.log('Senha incorreta');

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
      return console.log('Administrador não registrado');
    } catch (e) {
      return console.log('Erro ao logar como administrador');
    }
  }

  static async AdminLogout() {
    try {
      const adminData = await prisma.adminLogin.findMany();
      const adminEmail: string[] = [];

      adminData.map((data: { adminUser: string }) => {
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
