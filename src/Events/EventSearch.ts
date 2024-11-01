import { prisma } from '../../lib/prisma';
import { Auth, AuthResult } from '../interfaces/Auth';
import { EventSearchAbstract } from '../interfaces/EventSearchAbstract';

export class EventSearch implements EventSearchAbstract {
  constructor(
    public _adminLoginVerify: Auth,
    public _employeeLoginVerify: Auth,
    public _verifyResult: AuthResult,
  ) {}
  Verify(): Promise<unknown> {
    throw new Error('Method not implemented.');
  }

  public async SearchById(id: string, isSearch: boolean) {
    try {
      const employeeVerify = await this._employeeLoginVerify.Verify();
      const adminVerify = await this._adminLoginVerify.Verify();

      this._verifyResult.Result(employeeVerify, adminVerify);

      const findEvent = await prisma.event.findUnique({
        where: {
          id: id,
        },
      });

      return this.SearchResult(
        findEvent,
        [],
        isSearch,
        `Evento ${id} não encontrado`,
      );
    } catch (e) {
      return console.log(e);
    }
  }

  public async SearchByEventCreator(eventCreatorParam: string) {
    try {
      const employeeVerify = await this._employeeLoginVerify.Verify();
      const adminVerify = await this._adminLoginVerify.Verify();

      this._verifyResult.Result(employeeVerify, adminVerify);

      const findEvent = await prisma.event.findMany({
        where: {
          eventCreator: eventCreatorParam,
        },
      });

      return this.SearchResult(
        null,
        findEvent,
        true,
        `Eventos criados por: ${eventCreatorParam} nao encontrados`,
      );
    } catch (e) {
      return console.log(e);
    }
  }

  public async SearchByDate(dateParam: string) {
    try {
      const employeeVerify = await this._employeeLoginVerify.Verify();
      const adminVerify = await this._adminLoginVerify.Verify();

      this._verifyResult.Result(employeeVerify, adminVerify);

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
        true,
        `Eventos do dia: ${dateParam} nao encontrado`,
      );
    } catch (e) {
      return console.log(e);
    }
  }

  public async SearchByHour(hourParam: string) {
    try {
      const employeeVerify = await this._employeeLoginVerify.Verify();
      const adminVerify = await this._adminLoginVerify.Verify();

      this._verifyResult.Result(employeeVerify, adminVerify);

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
        true,
        `Eventos da hora: ${hourParam} nao encontrados`,
      );
    } catch (e) {
      return console.log(e);
    }
  }

  public async SearchByName(nameParam: string) {
    try {
      const employeeVerify = await this._employeeLoginVerify.Verify();
      const adminVerify = await this._adminLoginVerify.Verify();

      this._verifyResult.Result(employeeVerify, adminVerify);

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
        true,
        `Eventos de nome: ${nameParam} nao encontrados`,
      );
    } catch (e) {
      return console.log(e);
    }
  }

  public async SearchByHosts(hostsParam: string) {
    try {
      const employeeVerify = await this._employeeLoginVerify.Verify();
      const adminVerify = await this._adminLoginVerify.Verify();

      this._verifyResult.Result(employeeVerify, adminVerify);

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
        true,
        `Eventos com os anfitrioes: ${hostsParam} nao encontrados`,
      );
    } catch (e) {
      return console.log(e);
    }
  }

  public async SearchByLocation(locationParam: string) {
    try {
      const employeeVerify = await this._employeeLoginVerify.Verify();
      const adminVerify = await this._adminLoginVerify.Verify();

      this._verifyResult.Result(employeeVerify, adminVerify);

      const findEvent = await prisma.event.findMany({
        where: {
          location: locationParam,
        },
      });

      return this.SearchResult(
        null,
        findEvent,
        true,
        `Eventos no local: ${locationParam} nao encontrados`,
      );
    } catch (e) {
      return console.log(e);
    }
  }

  public async SearchByPlattform(plattformParam: string) {
    try {
      const employeeVerify = await this._employeeLoginVerify.Verify();
      const adminVerify = await this._adminLoginVerify.Verify();

      this._verifyResult.Result(employeeVerify, adminVerify);

      const findEvent = await prisma.event.findMany({
        where: {
          plattform: plattformParam,
        },
      });

      return this.SearchResult(
        null,
        findEvent,
        true,
        `Eventos na plataforma ${plattformParam} nao encontrados`,
      );
    } catch (e) {
      return console.log(e);
    }
  }

  public async SearchByEventCreatorId(eventCreatorIdParam: string) {
    try {
      const employeeVerify = await this._employeeLoginVerify.Verify();
      const adminVerify = await this._adminLoginVerify.Verify();

      this._verifyResult.Result(employeeVerify, adminVerify);

      const findEvent = await prisma.event.findMany({
        where: {
          eventCreatorId: eventCreatorIdParam,
        },
      });

      return this.SearchResult(
        null,
        findEvent,
        true,
        `Eventos criados pelo funcionário: ${eventCreatorIdParam} nao encontrados`,
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
        throw new Error('Evento não encontrado');
    }
  }
}
