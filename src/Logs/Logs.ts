import { prisma } from '../../lib/prisma';
import { AdminLoginVerify } from '../LoginVerify/AdminLoginVerify';
import { VerifyResult } from '../LoginVerify/VerifyResult';
import { Auth } from '../interfaces/Auth';
import { LogsAbstract } from '../interfaces/LogsAbstract';

export class Logs implements LogsAbstract, Auth {
  public _dateTime: string[] = [];
  public _email: string;
  public adminLoginVerify: AdminLoginVerify = new AdminLoginVerify();
  public verifyResult: VerifyResult = new VerifyResult();

  constructor(email: string = '', dateTime: string[] = []) {
    this._dateTime = dateTime;
    this._email = email;
  }

  public async Create() {
    try {
      if (!this._email || this._email === '') {
        return console.log('Email não enviado');
      }

      if (!this._dateTime || this._dateTime.length < 1) {
        return console.log('Data e hora não foram enviadas');
      }

      await prisma.logsLogin.create({
        data: {
          email: this._email,
          loginDate: this._dateTime[0],
          loginHour: this._dateTime[1],
        },
      });
    } catch (e) {
      return console.log(e);
    }
  }

  public async List() {
    try {
      const admLoginVerify = await this.adminLoginVerify.Verify();
      this.verifyResult.Result(null, admLoginVerify);

      const logsList = await prisma.logsLogin.findMany();

      if (logsList.length < 1) {
        return console.log('Ocorreu um erro ou não há loginsregistrados');
      }

      return console.table(logsList);
    } catch (e) {
      return console.log(e);
    }
  }
}
