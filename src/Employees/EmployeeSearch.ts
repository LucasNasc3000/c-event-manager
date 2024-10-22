import { prisma } from '../../lib/prisma';
import { AdminLoginVerify } from '../LoginVerify/AdminLoginVerify';
import { VerifyResult } from '../LoginVerify/VerifyResult';

export class EmployeeSearch {
  private adminLoginVerify: AdminLoginVerify = new AdminLoginVerify();
  private verifyResult: VerifyResult = new VerifyResult();

  public async SearchById(id: string) {
    try {
      const admLoginVerify = await this.adminLoginVerify.Verify();
      this.verifyResult.Result(null, admLoginVerify);

      const findEmployee = await prisma.employee.findUnique({
        where: {
          id: id,
        },
      });

      return this.SearchResult(findEmployee, [], 'Funcionário não encontrado');
    } catch (e) {
      return console.log(e);
    }
  }

  public async SearchByEmail(email: string) {
    try {
      const admLoginVerify = await this.adminLoginVerify.Verify();
      this.verifyResult.Result(null, admLoginVerify);

      const findEmployee = await prisma.employee.findUnique({
        where: {
          email: email,
        },
      });

      return this.SearchResult(
        findEmployee,
        [],
        `Funcionario com email "${email}" nao encontrado`,
      );
    } catch (e) {
      return console.log(e);
    }
  }

  public async SearchByName(name: string) {
    try {
      const admLoginVerify = await this.adminLoginVerify.Verify();
      this.verifyResult.Result(null, admLoginVerify);

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
        `Funcionarios com o nome "${name}" nao encontrados`,
      );
    } catch (e) {
      return console.log(e);
    }
  }

  private SearchResult(
    searchData: unknown,
    searchDataArray: unknown[],
    error: string,
  ) {
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
