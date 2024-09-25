import { prisma } from '../lib/prisma';
import { Employee } from './Employee';

export class Logs {
  private dateTime: string[] = [];
  private email: string;

  constructor(email: string, dateTime: string[] = []) {
    this.dateTime = dateTime;
    this.email = email;
  }

  public async CreateLogin() {
    try {
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

  public async ListLogins(password: string) {
    try {
      const emp = new Employee('', this.email, password);
      const admLoginVerify = await emp.AdminLoginVerify();
      if (admLoginVerify === false) {
        return console.log(
          'Operacao nao autorizada. Login do administrador necessario',
        );
      }

      const logsList = await prisma.logsLogin.findMany();
      return console.table(logsList);
    } catch (e) {
      return console.log(e);
    }
  }

  public async ListLogouts(password: string) {
    try {
      const emp = new Employee('', this.email, password);
      const admLoginVerify = await emp.AdminLoginVerify();
      if (admLoginVerify === false) {
        return console.log(
          'Operacao nao autorizada. Login do administrador necessario',
        );
      }

      const logsList = await prisma.logsLogout.findMany();
      return console.table(logsList);
    } catch (e) {
      return console.log(e);
    }
  }
}
