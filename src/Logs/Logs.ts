import { prisma } from '../lib/prisma';
import { Employee } from './Employees/Employee';

export class Logs {
  private dateTime: string[] = [];
  private email: string;

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

      if (logsList.length < 1) {
        return console.log('Ocorreu um erro ou não há loginsregistrados');
      }

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

      if (logsList.length < 1) {
        return console.log('Ocorreu um erro ou não há logouts registrados');
      }

      return console.table(logsList);
    } catch (e) {
      return console.log(e);
    }
  }

  public async LogSearchEmail(password: string, emailSearchValue: string) {
    try {
      const emp = new Employee('', this.email, password);
      const admLoginVerify = await emp.AdminLoginVerify();
      if (admLoginVerify === false) {
        return console.log(
          'Operacao nao autorizada. Login do administrador necessario',
        );
      }

      const findLog = await prisma.logsLogin.findMany({
        where: {
          email: emailSearchValue,
        },
      });

      if (findLog.length < 1) {
        return console.log(
          `Logs do funcionário ${emailSearchValue} nao encontrados`,
        );
      }

      return console.table(findLog);
    } catch (e) {
      return console.log(e);
    }
  }

  public async LogSearchDate(password: string, dateSearchValue: string) {
    try {
      const emp = new Employee('', this.email, password);
      const admLoginVerify = await emp.AdminLoginVerify();
      if (admLoginVerify === false) {
        return console.log(
          'Operacao nao autorizada. Login do administrador necessario',
        );
      }

      const findLog = await prisma.logsLogin.findMany({
        where: {
          loginDate: {
            startsWith: dateSearchValue,
          },
        },
      });

      if (findLog.length < 1) {
        return console.log(`Logs da data ${dateSearchValue} nao encontrados`);
      }

      return console.table(findLog);
    } catch (e) {
      return console.log(e);
    }
  }

  public async LogSearchHour(password: string, hourSearchValue: string) {
    try {
      const emp = new Employee('', this.email, password);
      const admLoginVerify = await emp.AdminLoginVerify();
      if (admLoginVerify === false) {
        return console.log(
          'Operacao nao autorizada. Login do administrador necessario',
        );
      }

      const findLog = await prisma.logsLogin.findMany({
        where: {
          loginHour: {
            startsWith: hourSearchValue,
          },
        },
      });

      if (findLog.length < 1) {
        return console.log(`Logs da data ${hourSearchValue} nao encontrados`);
      }

      return console.table(findLog);
    } catch (e) {
      return console.log(e);
    }
  }

  public async LogoutSearchEmail(password: string, emailSearchValue: string) {
    try {
      const emp = new Employee('', this.email, password);
      const admLoginVerify = await emp.AdminLoginVerify();
      if (admLoginVerify === false) {
        return console.log(
          'Operacao nao autorizada. Login do administrador necessario',
        );
      }

      const findLogout = await prisma.logsLogout.findMany({
        where: {
          email: emailSearchValue,
        },
      });

      if (findLogout.length < 1) {
        return console.log(
          `Logouts do funcionário ${emailSearchValue} nao encontrados`,
        );
      }

      return console.table(findLogout);
    } catch (e) {
      return console.log(e);
    }
  }

  public async LogoutSearchDate(password: string, dateSearchValue: string) {
    try {
      const emp = new Employee('', this.email, password);
      const admLoginVerify = await emp.AdminLoginVerify();
      if (admLoginVerify === false) {
        return console.log(
          'Operacao nao autorizada. Login do administrador necessario',
        );
      }

      const findLog = await prisma.logsLogout.findMany({
        where: {
          logoutDate: {
            startsWith: dateSearchValue,
          },
        },
      });

      if (findLog.length < 1) {
        return console.log(
          `Logouts da data ${dateSearchValue} nao encontrados`,
        );
      }

      return console.table(findLog);
    } catch (e) {
      return console.log(e);
    }
  }

  public async LogoutSearchHour(password: string, hourSearchValue: string) {
    try {
      const emp = new Employee('', this.email, password);
      const admLoginVerify = await emp.AdminLoginVerify();
      if (admLoginVerify === false) {
        return console.log(
          'Operacao nao autorizada. Login do administrador necessario',
        );
      }

      const findLog = await prisma.logsLogout.findMany({
        where: {
          logoutHour: {
            startsWith: hourSearchValue,
          },
        },
      });

      if (findLog.length < 1) {
        return console.log(
          `Logouts da data ${hourSearchValue} nao encontrados`,
        );
      }

      return console.table(findLog);
    } catch (e) {
      return console.log(e);
    }
  }
}
