import { prisma } from '../../lib/prisma';
import { AdminLoginVerify } from '../LoginVerify/AdminLoginVerify';
import { VerifyResult } from '../LoginVerify/VerifyResult';
import { LogsAbstract } from '../interfaces/LogsAbstract';

export class Logouts implements LogsAbstract {
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

      await prisma.logsLogout.create({
        data: {
          email: this._email,
          logoutDate: this._dateTime[0],
          logoutHour: this._dateTime[1],
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

      const logoutsList = await prisma.logsLogout.findMany();

      if (logoutsList.length < 1) {
        return console.log('Ocorreu um erro ou não há logouts registrados');
      }

      return console.table(logoutsList);
    } catch (e) {
      return console.log(e);
    }
  }
}
