import { prisma } from '../lib/prisma';

export class Logs {
  private dateTime: string[] = [];
  private email: string;

  constructor(email: string, dateTime: string[]) {
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
}
