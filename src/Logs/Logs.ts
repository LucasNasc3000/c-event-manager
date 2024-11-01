import { prisma } from '../../lib/prisma';
import { AdminLoginVerify } from '../LoginVerify/AdminLoginVerify';
import { VerifyResult } from '../LoginVerify/VerifyResult';
import { LogsAbstract } from '../interfaces/LogsAbstract';

export class Logs implements LogsAbstract {
  constructor(
    public _email: string = '',
    public _dateTime: string[] = [],
  ) {}

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
      const admLoginVerify: AdminLoginVerify = new AdminLoginVerify();
      const verifyResult: VerifyResult = new VerifyResult();

      await admLoginVerify.Verify();
      verifyResult.Result(null, admLoginVerify);

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
