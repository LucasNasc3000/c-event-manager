import { prisma } from '../../lib/prisma';
import { AdminLoginVerify } from '../LoginVerify/AdminLoginVerify';

export class Logs {
  private dateTime: string[] = [];
  private email: string;
  private adminLoginVerify: AdminLoginVerify = new AdminLoginVerify();

  constructor(email: string = '', dateTime: string[] = []) {
    this.dateTime = dateTime;
    this.email = email;
  }

  public async CreateLogin() {
    try {
      if (!this.email || this.email === '') {
        return console.log('Email não enviado');
      }

      if (!this.dateTime || this.dateTime.length < 1) {
        return console.log('Data e hora não foram enviadas');
      }

      await prisma.logsLogin.create({
        data: {
          email: this.email,
          loginDate: this.dateTime[0],
          loginHour: this.dateTime[1],
        },
      });
    } catch (e) {
      return console.log(e);
    }
  }

  public async CreateLogout() {
    try {
      if (!this.email || this.email === '') {
        return console.log('Email não enviado');
      }

      if (!this.dateTime || this.dateTime.length < 1) {
        return console.log('Data e hora não foram enviadas');
      }

      await prisma.logsLogout.create({
        data: {
          email: this.email,
          logoutDate: this.dateTime[0],
          logoutHour: this.dateTime[1],
        },
      });
    } catch (e) {
      return console.log(e);
    }
  }

  public async ListLogins() {
    try {
      const admLoginVerify = await this.adminLoginVerify.Verify();
      if (admLoginVerify === false) {
        return console.log(
          'Operacao nao autorizada. Login do administrador necessario',
        );
      }

      const logsList = await prisma.logsLogin.findMany();

      if (logsList.length < 1) {
        return console.log('Ocorreu um erro ou não há loginsregistrados');
      }

      return console.table(logsList);
    } catch (e) {
      return console.log(e);
    }
  }

  public async ListLogouts() {
    try {
      const admLoginVerify = await this.adminLoginVerify.Verify();
      if (admLoginVerify === false) {
        return console.log(
          'Operacao nao autorizada. Login do administrador necessario',
        );
      }

      const logsList = await prisma.logsLogout.findMany();

      if (logsList.length < 1) {
        return console.log('Ocorreu um erro ou não há logouts registrados');
      }

      return console.table(logsList);
    } catch (e) {
      return console.log(e);
    }
  }
}
