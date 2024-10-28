/* eslint-disable no-unused-vars */
import { prisma } from '../../lib/prisma';
import { EventSearch } from './EventSearch';
import { AdminLoginVerify } from '../LoginVerify/AdminLoginVerify';
import { EmployeeLoginVerify } from '../LoginVerify/EmployeeLoginVerify';
import { VerifyResult } from '../LoginVerify/VerifyResult';

export class Event {
  private eventSearch: EventSearch = new EventSearch();
  private adminLoginVerify: AdminLoginVerify = new AdminLoginVerify();
  private employeeLoginVerify: EmployeeLoginVerify = new EmployeeLoginVerify();
  private verifyResult: VerifyResult = new VerifyResult();

  async Create(data: string[]) {
    try {
      const employeeVerify = await this.employeeLoginVerify.Verify();
      const adminVerify = await this.adminLoginVerify.Verify();

      this.verifyResult.Result(employeeVerify, adminVerify);

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
      const employeeVerify = await this.employeeLoginVerify.Verify();
      const adminVerify = await this.adminLoginVerify.Verify();

      this.verifyResult.Result(employeeVerify, adminVerify);

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
      const employeeVerify = await this.employeeLoginVerify.Verify();
      const adminVerify = await this.adminLoginVerify.Verify();

      this.verifyResult.Result(employeeVerify, adminVerify);

      await this.eventSearch.SearchById(id, false);

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

      const updateCheck = await this.eventSearch.SearchById(id, true);

      return updateCheck;
    } catch (e) {
      return console.log(e);
    }
  }

  public async Delete(id: string) {
    try {
      const employeeVerify = await this.employeeLoginVerify.Verify();
      const adminVerify = await this.adminLoginVerify.Verify();

      this.verifyResult.Result(employeeVerify, adminVerify);

      await this.eventSearch.SearchById(id, false);

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
