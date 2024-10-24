import { prisma } from '../../lib/prisma';
import { AdminLoginVerify } from '../LoginVerify/AdminLoginVerify';
import { VerifyResult } from '../LoginVerify/VerifyResult';

export class LogsSearch {
  private adminLoginVerify: AdminLoginVerify = new AdminLoginVerify();
  private verifyResult: VerifyResult = new VerifyResult();

  public async LogSearchId(id: string) {
    try {
      const admLoginVerify = await this.adminLoginVerify.Verify();
      this.verifyResult.Result(null, admLoginVerify);

      const findLog = await prisma.logsLogin.findUnique({
        where: {
          id: id,
        },
      });

      return this.SearchResult(findLog, [], `Log ${id} nao encontrado`);
    } catch (e) {
      return console.log(e);
    }
  }

  public async LogSearchEmail(emailSearchValue: string) {
    try {
      const admLoginVerify = await this.adminLoginVerify.Verify();
      this.verifyResult.Result(null, admLoginVerify);

      const findLog = await prisma.logsLogin.findMany({
        where: {
          email: emailSearchValue,
        },
      });

      return this.SearchResult(
        null,
        findLog,
        `Logs do funcionário ${emailSearchValue} nao encontrados`,
      );
    } catch (e) {
      return console.log(e);
    }
  }

  public async LogSearchDate(dateSearchValue: string) {
    try {
      const admLoginVerify = await this.adminLoginVerify.Verify();
      this.verifyResult.Result(null, admLoginVerify);

      const findLog = await prisma.logsLogin.findMany({
        where: {
          loginDate: {
            startsWith: dateSearchValue,
          },
        },
      });

      return this.SearchResult(
        null,
        findLog,
        `Logs da data ${dateSearchValue} nao encontrados`,
      );
    } catch (e) {
      return console.log(e);
    }
  }

  public async LogSearchHour(hourSearchValue: string) {
    try {
      const admLoginVerify = await this.adminLoginVerify.Verify();
      this.verifyResult.Result(null, admLoginVerify);

      const findLog = await prisma.logsLogin.findMany({
        where: {
          loginHour: {
            startsWith: hourSearchValue,
          },
        },
      });

      return this.SearchResult(
        null,
        findLog,
        `Logs da data ${hourSearchValue} nao encontrados`,
      );
    } catch (e) {
      return console.log(e);
    }
  }

  public async LogoutSearchId(id: string) {
    try {
      const admLoginVerify = await this.adminLoginVerify.Verify();
      this.verifyResult.Result(null, admLoginVerify);

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

  public async LogoutSearchEmail(emailSearchValue: string) {
    try {
      const admLoginVerify = await this.adminLoginVerify.Verify();
      this.verifyResult.Result(null, admLoginVerify);

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

  public async LogoutSearchDate(dateSearchValue: string) {
    try {
      const admLoginVerify = await this.adminLoginVerify.Verify();
      this.verifyResult.Result(null, admLoginVerify);

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

  public async LogoutSearchHour(hourSearchValue: string) {
    try {
      const admLoginVerify = await this.adminLoginVerify.Verify();
      this.verifyResult.Result(null, admLoginVerify);

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
