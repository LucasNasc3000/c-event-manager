/* eslint-disable no-unused-vars */
import { prisma } from '../../lib/prisma';
import { EventSearch } from './EventSearch';
import { Auth, AuthResult } from '../interfaces/Auth';
import { EventAbstract } from '../interfaces/EventAbstract';
import { VerifyResult } from '../LoginVerify/VerifyResult';
import { EmployeeLoginVerify } from '../LoginVerify/EmployeeLoginVerify';
import { AdminLoginVerify } from '../LoginVerify/AdminLoginVerify';
import { EventSearchFilter } from './EventSearchFilter';

export class Event implements EventAbstract {
  constructor(
    public _adminLoginVerify: Auth,
    public _employeeLoginVerify: Auth,
    public _verifyResult: AuthResult,
  ) {}
  Verify(): Promise<unknown> {
    throw new Error('Method not implemented.');
  }

  async Create(data: string[]) {
    try {
      const employeeVerify = await this._employeeLoginVerify.Verify();
      const adminVerify = await this._adminLoginVerify.Verify();

      this._verifyResult.Result(employeeVerify, adminVerify);

      const event = await prisma.event.create({
        data: {
          eventCreator: data[0],
          date: data[1],
          hour: data[2],
          name: data[3],
          hosts: data[4],
          modality: data[5],
          location: data[6],
          plattform: data[7],
          eventCreatorId: data[8],
        },
      });

      return console.table(event);
    } catch (e) {
      return console.log(e);
    }
  }

  async List() {
    try {
      const employeeVerify = await this._employeeLoginVerify.Verify();
      const adminVerify = await this._adminLoginVerify.Verify();

      this._verifyResult.Result(employeeVerify, adminVerify);

      const eventsList = await prisma.event.findMany();

      if (eventsList.length < 1) {
        return console.log('Ocorreu um erro ou não há eventos cadastrados');
      }

      return console.table(eventsList);
    } catch (e) {
      return console.log(e);
    }
  }

  public async Update(id: string, data: string[]) {
    try {
      const localEmployeeVerify = await this._employeeLoginVerify.Verify();
      const localAdminVerify = await this._adminLoginVerify.Verify();
      this._verifyResult.Result(localEmployeeVerify, localAdminVerify);

      const employeeVerify: EmployeeLoginVerify = new EmployeeLoginVerify();
      const adminVerify: AdminLoginVerify = new AdminLoginVerify();
      const verifyResult: VerifyResult = new VerifyResult();

      const eventSearch: EventSearch = new EventSearch(
        adminVerify,
        employeeVerify,
        verifyResult,
      );

      await eventSearch.SearchById(id, false);

      await prisma.event.update({
        where: {
          id: id,
        },

        data: {
          eventCreator: data[0],
          date: data[1],
          hour: data[2],
          name: data[3],
          hosts: data[4],
          modality: data[5],
          location: data[6],
          plattform: data[7],
        },
      });

      const showEvent: EventSearch = new EventSearch(
        adminVerify,
        employeeVerify,
        verifyResult,
      );

      const eventSearchFilter: EventSearchFilter = new EventSearchFilter(
        'id',
        id,
        showEvent,
      );

      const updateCheck = await eventSearchFilter.Filter();

      return updateCheck;
    } catch (e) {
      return console.log(e);
    }
  }

  public async Delete(id: string) {
    try {
      const localEmployeeVerify = await this._employeeLoginVerify.Verify();
      const localAdminVerify = await this._adminLoginVerify.Verify();
      this._verifyResult.Result(localEmployeeVerify, localAdminVerify);

      const employeeVerify: EmployeeLoginVerify = new EmployeeLoginVerify();
      const adminVerify: AdminLoginVerify = new AdminLoginVerify();
      const verifyResult: VerifyResult = new VerifyResult();

      const eventSearch: EventSearch = new EventSearch(
        adminVerify,
        employeeVerify,
        verifyResult,
      );

      await eventSearch.SearchById(id, false);

      const deleteEvent = await prisma.event.delete({
        where: {
          id: id,
        },
      });

      return console.log(`Evento ${deleteEvent.id} deletado`);
    } catch (e) {
      return console.log(e);
    }
  }
}
