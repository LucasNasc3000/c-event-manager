import { prisma } from '../../lib/prisma';
import { Auth, AuthResult } from '../interfaces/Auth';
import { EmployeeSearchAbstract } from '../interfaces/EmployeeSearchAbstract';

export class EmployeeSearch implements EmployeeSearchAbstract {
  constructor(
    public _adminLoginVerify: Auth,
    public _verifyResult: AuthResult,
  ) {}
  Verify(): Promise<unknown> {
    throw new Error('Method not implemented.');
  }

  public async SearchById(id: string, isSearch: boolean = true) {
    try {
      const admLoginVerify = await this._adminLoginVerify.Verify();
      this._verifyResult.Result(null, admLoginVerify);

      const findEmployee = await prisma.employee.findUnique({
        where: {
          id: id,
        },
      });

      return this.SearchResult(
        findEmployee,
        [],
        isSearch,
        'Funcionário não encontrado',
      );
    } catch (e) {
      return console.log(e);
    }
  }

  public async SearchByEmail(email: string) {
    try {
      const admLoginVerify = await this._adminLoginVerify.Verify();
      this._verifyResult.Result(null, admLoginVerify);

      const findEmployee = await prisma.employee.findUnique({
        where: {
          email: email,
        },
      });

      return this.SearchResult(
        findEmployee,
        [],
        true,
        `Funcionario com email "${email}" nao encontrado`,
      );
    } catch (e) {
      return console.log(e);
    }
  }

  public async SearchByName(name: string) {
    try {
      const admLoginVerify = await this._adminLoginVerify.Verify();
      this._verifyResult.Result(null, admLoginVerify);

      const findEmployee = await prisma.employee.findMany({
        where: {
          name: {
            startsWith: name,
          },
        },
      });

      return this.SearchResult(
        null,
        findEmployee,
        true,
        `Funcionarios com o nome "${name}" nao encontrados`,
      );
    } catch (e) {
      return console.log(e);
    }
  }

  private SearchResult(
    searchData: unknown,
    searchDataArray: unknown[],
    isSearch: boolean,
    error: string,
  ): void | object {
    switch (true) {
      case isSearch === true &&
        searchData === null &&
        searchDataArray.length < 1:
        return console.log(error);

      case isSearch === true &&
        searchData === null &&
        searchDataArray.length > 0:
        return console.table(searchDataArray);

      case isSearch === true &&
        searchDataArray.length < 1 &&
        searchData !== null:
        return console.table(searchData);

      case isSearch === false &&
        searchDataArray.length > 0 &&
        searchData === null:
        return searchDataArray;

      case isSearch === false &&
        searchData !== null &&
        searchDataArray.length < 1:
        return searchData;

      case isSearch === false &&
        searchData === null &&
        searchDataArray.length < 1:
        throw new Error('Funcionário não encontrado');
    }
  }
}
