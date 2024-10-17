import { prisma } from '../../lib/prisma';
import { AdminLoginVerify } from '../LoginVerify/AdminLoginVerify';
import { EmployeeLoginVerify } from '../LoginVerify/EmployeeLoginVerify';
import { VerifyResult } from '../LoginVerify/VerifyResult';

export class EventSearch {
  private adminLoginVerify: AdminLoginVerify = new AdminLoginVerify();
  private employeeLoginVerify: EmployeeLoginVerify = new EmployeeLoginVerify();
  private verifyResult: VerifyResult = new VerifyResult();

  public async SearchById(id: string) {
    try {
      const employeeVerify = await this.employeeLoginVerify.Verify();
      const adminVerify = await this.adminLoginVerify.Verify();

      this.verifyResult.Result(employeeVerify, adminVerify);

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
      const employeeVerify = await this.employeeLoginVerify.Verify();
      const adminVerify = await this.adminLoginVerify.Verify();

      this.verifyResult.Result(employeeVerify, adminVerify);

      const findEvent = await prisma.event.findMany({
        where: {
          eventCreator: eventCreatorParam,
        },
      });

      return this.SearchResult(
        null,
        findEvent,
        `Eventos criados por: ${eventCreatorParam} nao encontrados`,
      );
    } catch (e) {
      console.log(e);
    }
  }

  public async SearchByDate(dateParam: string) {
    try {
      const employeeVerify = await this.employeeLoginVerify.Verify();
      const adminVerify = await this.adminLoginVerify.Verify();

      this.verifyResult.Result(employeeVerify, adminVerify);

      const findEvent = await prisma.event.findMany({
        where: {
          date: {
            startsWith: dateParam,
          },
        },
      });

      return this.SearchResult(
        null,
        findEvent,
        `Eventos do dia: ${dateParam} nao encontrado`,
      );
    } catch (e) {
      return e;
    }
  }

  public async SearchByHour(hourParam: string) {
    try {
      const employeeVerify = await this.employeeLoginVerify.Verify();
      const adminVerify = await this.adminLoginVerify.Verify();

      this.verifyResult.Result(employeeVerify, adminVerify);

      const findEvent = await prisma.event.findMany({
        where: {
          hour: {
            startsWith: hourParam,
          },
        },
      });

      return this.SearchResult(
        null,
        findEvent,
        `Eventos da hora: ${hourParam} nao encontrados`,
      );
    } catch (e) {
      console.log(e);
    }
  }

  public async SearchByName(nameParam: string) {
    try {
      const employeeVerify = await this.employeeLoginVerify.Verify();
      const adminVerify = await this.adminLoginVerify.Verify();

      this.verifyResult.Result(employeeVerify, adminVerify);

      const findEvent = await prisma.event.findMany({
        where: {
          name: {
            startsWith: nameParam,
          },
        },
      });

      return this.SearchResult(
        null,
        findEvent,
        `Eventos de nome: ${nameParam} nao encontrados`,
      );
    } catch (e) {
      console.log(e);
    }
  }

  public async SearchByHosts(hostsParam: string) {
    try {
      const employeeVerify = await this.employeeLoginVerify.Verify();
      const adminVerify = await this.adminLoginVerify.Verify();

      this.verifyResult.Result(employeeVerify, adminVerify);

      const findEvent = await prisma.event.findMany({
        where: {
          hosts: {
            startsWith: hostsParam,
          },
        },
      });

      return this.SearchResult(
        null,
        findEvent,
        `Eventos com os anfitrioes: ${hostsParam} nao encontrados`,
      );
    } catch (e) {
      console.log(e);
    }
  }

  public async SearchByLocation(locationParam: string) {
    try {
      const employeeVerify = await this.employeeLoginVerify.Verify();
      const adminVerify = await this.adminLoginVerify.Verify();

      this.verifyResult.Result(employeeVerify, adminVerify);

      const findEvent = await prisma.event.findMany({
        where: {
          location: locationParam,
        },
      });

      return this.SearchResult(
        null,
        findEvent,
        `Eventos no local: ${locationParam} nao encontrados`,
      );
    } catch (e) {
      console.log(e);
    }
  }

  public async SearchByPlattform(plattformParam: string) {
    try {
      const employeeVerify = await this.employeeLoginVerify.Verify();
      const adminVerify = await this.adminLoginVerify.Verify();

      this.verifyResult.Result(employeeVerify, adminVerify);

      const findEvent = await prisma.event.findMany({
        where: {
          plattform: plattformParam,
        },
      });

      return this.SearchResult(
        null,
        findEvent,
        `Eventos na plataforma ${plattformParam} nao encontrados`,
      );
    } catch (e) {
      console.log(e);
    }
  }

  public async SearchByEventCreatorId(eventCreatorIdParam: string) {
    try {
      const employeeVerify = await this.employeeLoginVerify.Verify();
      const adminVerify = await this.adminLoginVerify.Verify();

      this.verifyResult.Result(employeeVerify, adminVerify);

      const findEvent = await prisma.event.findMany({
        where: {
          eventCreatorId: eventCreatorIdParam,
        },
      });

      return this.SearchResult(
        null,
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
