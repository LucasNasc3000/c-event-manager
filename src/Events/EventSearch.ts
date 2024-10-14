import { prisma } from '../../lib/prisma';

export class EventSearch {
  private errorMsg: string =
    'Operação não autorizada, login de funcionário necessário';

  async EmployeeLoginVerify() {
    try {
      const employeeLogin = await prisma.userLogin.findMany();
      const empData: string[] = [];

      if (employeeLogin.length <= 0) return false;

      employeeLogin.map((employee) => {
        empData.push(employee.userEmail, employee.userPassword);
      });

      const employeeLoginVerify = await prisma.employee.findUnique({
        where: {
          email: empData[0],
          password: empData[1],
        },
      });

      if (!employeeLoginVerify) {
        return console.log(
          `Erro ao validar login do funcionário: ${empData[0]}`,
        );
      }

      if (
        employeeLoginVerify.email === empData[0] &&
        employeeLoginVerify.password === empData[1]
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
      const employeeVerify = await this.EmployeeLoginVerify();
      if (employeeVerify === false) return console.log(this.errorMsg);

      if (!employeeVerify) return console.log('Erro desconhecido');

      const findEvent = await prisma.event.findUnique({
        where: {
          id: id,
        },
      });

      return this.SearchResult(findEvent, [], `Evento ${id} não encontrado`);
    } catch (e) {
      console.log(e);
    }
  }

  public async SearchByEventCreator(eventCreatorParam: string) {
    try {
      const employeeVerify = await this.EmployeeLoginVerify();
      if (employeeVerify === false) return console.log(this.errorMsg);

      if (!employeeVerify) return console.log('Erro desconhecido');

      const findEvent = await prisma.event.findMany({
        where: {
          eventCreator: eventCreatorParam,
        },
      });

      return this.SearchResult(
        {},
        findEvent,
        `Eventos criados por: ${eventCreatorParam} nao encontrados`,
      );
    } catch (e) {
      console.log(e);
    }
  }

  public async SearchByDate(dateParam: string) {
    try {
      const employeeVerify = await this.EmployeeLoginVerify();
      if (employeeVerify === false) return console.log(this.errorMsg);

      if (!employeeVerify) return console.log('Erro desconhecido');

      const findEvent = await prisma.event.findMany({
        where: {
          date: {
            startsWith: dateParam,
          },
        },
      });

      return this.SearchResult(
        {},
        findEvent,
        `Eventos do dia: ${dateParam} nao encontrado`,
      );
    } catch (e) {
      console.log(e);
    }
  }

  public async SearchByHour(hourParam: string) {
    try {
      const employeeVerify = await this.EmployeeLoginVerify();
      if (employeeVerify === false) return console.log(this.errorMsg);

      if (!employeeVerify) return console.log('Erro desconhecido');

      const findEvent = await prisma.event.findMany({
        where: {
          hour: {
            startsWith: hourParam,
          },
        },
      });

      return this.SearchResult(
        {},
        findEvent,
        `Eventos da hora: ${hourParam} nao encontrados`,
      );
    } catch (e) {
      console.log(e);
    }
  }

  public async SearchByName(nameParam: string) {
    try {
      const employeeVerify = await this.EmployeeLoginVerify();
      if (employeeVerify === false) return console.log(this.errorMsg);

      if (!employeeVerify) return console.log('Erro desconhecido');

      const findEvent = await prisma.event.findMany({
        where: {
          name: {
            startsWith: nameParam,
          },
        },
      });

      return this.SearchResult(
        {},
        findEvent,
        `Eventos de nome: ${nameParam} nao encontrados`,
      );
    } catch (e) {
      console.log(e);
    }
  }

  public async SearchByHosts(hostsParam: string) {
    try {
      const employeeVerify = await this.EmployeeLoginVerify();
      if (employeeVerify === false) return console.log(this.errorMsg);

      if (!employeeVerify) return console.log('Erro desconhecido');

      const findEvent = await prisma.event.findMany({
        where: {
          hosts: {
            startsWith: hostsParam,
          },
        },
      });

      return this.SearchResult(
        {},
        findEvent,
        `Eventos com os anfitrioes: ${hostsParam} nao encontrados`,
      );
    } catch (e) {
      console.log(e);
    }
  }

  public async SearchByLocation(locationParam: string) {
    try {
      const employeeVerify = await this.EmployeeLoginVerify();
      if (employeeVerify === false) return console.log(this.errorMsg);

      if (!employeeVerify) return console.log('Erro desconhecido');

      const findEvent = await prisma.event.findMany({
        where: {
          location: locationParam,
        },
      });

      return this.SearchResult(
        {},
        findEvent,
        `Eventos no local: ${locationParam} nao encontrados`,
      );
    } catch (e) {
      console.log(e);
    }
  }

  public async SearchByPlattform(plattformParam: string) {
    try {
      const employeeVerify = await this.EmployeeLoginVerify();
      if (employeeVerify === false) return console.log(this.errorMsg);

      if (!employeeVerify) return console.log('Erro desconhecido');

      const findEvent = await prisma.event.findMany({
        where: {
          plattform: plattformParam,
        },
      });

      return this.SearchResult(
        {},
        findEvent,
        `Eventos na plataforma ${plattformParam} nao encontrados`,
      );
    } catch (e) {
      console.log(e);
    }
  }

  public async SearchByEventCreatorId(eventCreatorIdParam: string) {
    try {
      const employeeVerify = await this.EmployeeLoginVerify();
      if (employeeVerify === false) return console.log(this.errorMsg);

      if (!employeeVerify) return console.log('Erro desconhecido');

      const findEvent = await prisma.event.findMany({
        where: {
          eventCreatorId: eventCreatorIdParam,
        },
      });

      return this.SearchResult(
        {},
        findEvent,
        `Eventos criados pelo funcionário: ${eventCreatorIdParam} nao encontrados`,
      );
    } catch (e) {
      console.log(e);
    }
  }

  private SearchResult(
    searchData: unknown,
    searchDataArray: unknown[],
    error: string,
  ) {
    if (searchData === null) return console.log(error);

    if (searchDataArray.length < 1) return console.log(error);

    console.table(searchData);
  }
}
