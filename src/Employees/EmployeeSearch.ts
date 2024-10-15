import { prisma } from '../../lib/prisma';

export class EmployeeSearch {
  private errorMsg: string =
    'Operacao nao autorizada. Login do administrador necessario';

  public async AdminLoginVerify() {
    try {
      const admLogin = await prisma.adminLogin.findMany();
      const adminData: string[] = [];

      if (admLogin.length <= 0) return false;

      admLogin.map((adm) => {
        adminData.push(adm.adminUser, adm.adminPassword);
      });

      const adminVerify = await prisma.employee.findUnique({
        where: {
          email: adminData[0],
          password: adminData[1],
        },
      });

      if (!adminVerify) {
        return console.log(
          `Erro ao validar login do administrador ${admLogin[0]}`,
        );
      }

      if (
        adminVerify.email === adminData[0] &&
        adminVerify.password === adminData[1]
      ) {
        return true;
      }
      return false;
    } catch (e) {
      return console.log(e);
    }
  }

  public async SearchById(id: string) {
    try {
      const admLoginVerify = await this.AdminLoginVerify();
      if (admLoginVerify === false) return console.log(this.errorMsg);

      const findEmployee = await prisma.employee.findUnique({
        where: {
          id: id,
        },
      });

      return this.SearchResult(findEmployee, [], 'Funcionário não encontrado');
    } catch (e) {
      console.log(e);
    }
  }

  public async SearchByEmail(email: string) {
    try {
      const admLoginVerify = await this.AdminLoginVerify();
      if (admLoginVerify === false) return console.log(this.errorMsg);

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
      const admLoginVerify = await this.AdminLoginVerify();
      if (admLoginVerify === false) return console.log(this.errorMsg);

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
