import { prisma } from '../../lib/prisma';
import { Auth, AuthResult } from '../interfaces/Auth';
import { LogsSearchAbstract } from '../interfaces/LogsSearchAbstract';

export class LogoutsSearch implements LogsSearchAbstract {
  constructor(
    public _adminLoginVerify: Auth,
    public _verifyResult: AuthResult,
  ) {}

  public async SearchById(id: string) {
    try {
      const admLoginVerify = await this._adminLoginVerify.Verify();
      this._verifyResult.Result(null, admLoginVerify);

      const findLogout = await prisma.logsLogout.findUnique({
        where: {
          id: id,
        },
      });

      return this.SearchResult(findLogout, [], `Logout ${id} não encontrado`);
    } catch (e) {
      return console.log(e);
    }
  }

  public async SearchByEmail(emailSearchValue: string) {
    try {
      const admLoginVerify = await this._adminLoginVerify.Verify();
      this._verifyResult.Result(null, admLoginVerify);

      const findLogout = await prisma.logsLogout.findMany({
        where: {
          email: emailSearchValue,
        },
      });

      return this.SearchResult(
        null,
        findLogout,
        `Logouts do funcionário ${emailSearchValue} nao encontrados`,
      );
    } catch (e) {
      return console.log(e);
    }
  }

  public async SearchByDate(dateSearchValue: string) {
    try {
      const admLoginVerify = await this._adminLoginVerify.Verify();
      this._verifyResult.Result(null, admLoginVerify);

      const findLogout = await prisma.logsLogout.findMany({
        where: {
          logoutDate: {
            startsWith: dateSearchValue,
          },
        },
      });

      return this.SearchResult(
        null,
        findLogout,
        `Logouts da data ${dateSearchValue} nao encontrados`,
      );
    } catch (e) {
      return console.log(e);
    }
  }

  public async SearchByHour(hourSearchValue: string) {
    try {
      const admLoginVerify = await this._adminLoginVerify.Verify();
      this._verifyResult.Result(null, admLoginVerify);

      const findLogout = await prisma.logsLogout.findMany({
        where: {
          logoutHour: {
            startsWith: hourSearchValue,
          },
        },
      });

      return this.SearchResult(
        null,
        findLogout,
        `Logouts da data ${hourSearchValue} nao encontrados`,
      );
    } catch (e) {
      return console.log(e);
    }
  }

  private SearchResult(
    searchData: unknown,
    searchDataArray: unknown[],
    error: string,
  ): void | object {
    switch (true) {
      case searchData === null && searchDataArray.length < 1:
        return console.log(error);

      case searchData === null && searchDataArray.length > 0:
        return console.table(searchDataArray);

      case searchDataArray.length < 1 && searchData !== null:
        return console.table(searchData);
    }
  }
}
