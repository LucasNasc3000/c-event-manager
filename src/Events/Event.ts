/* eslint-disable no-unused-vars */
import { prisma } from '../../lib/prisma';

export class Event {
  constructor(
    private eventCreator: string = '',
    private date: string = '',
    private hour: string = '',
    private name: string = '',
    private hosts: string = '',
    private modality: string = '',
    private location: string = '',
    private plattform: string = '',
    private eventCreatorId: string = '',
    private errorMsg: string = 'Operação não autorizada, login de funcionário necessário',
  ) {}

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

  async Create() {
    try {
      const employeeVerify = await this.EmployeeLoginVerify();
      if (employeeVerify === false) return console.log(this.errorMsg);

      if (!employeeVerify) return console.log('Erro desconhecido');

      const event = await prisma.event.create({
        data: {
          eventCreator: this.eventCreator,
          date: this.date,
          hour: this.hour,
          name: this.name,
          hosts: this.hosts,
          modality: this.modality,
          location: this.location,
          plattform: this.plattform,
          eventCreatorId: this.eventCreatorId,
        },
      });

      return console.table(event);
    } catch (e) {
      return console.log(e);
    }
  }

  async List() {
    try {
      const employeeVerify = await this.EmployeeLoginVerify();
      if (employeeVerify === false) return console.log(this.errorMsg);

      if (!employeeVerify) return console.log('Erro desconhecido');

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
      const employeeVerify = await this.EmployeeLoginVerify();
      if (employeeVerify === false) return console.log(this.errorMsg);

      if (!employeeVerify) return console.log('Erro desconhecido');

      const findEvent = await prisma.event.findUnique({
        where: {
          id: id,
        },
      });

      if (!findEvent) return console.log(`Evento ${id} nao encontrado`);

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

      const updateCheck = await this.SearchById(id);

      return updateCheck;
    } catch (e) {
      return console.log(e);
    }
  }

  public async Delete(id: string) {
    try {
      const employeeVerify = await this.EmployeeLoginVerify();
      if (employeeVerify === false) return console.log(this.errorMsg);

      if (!employeeVerify) return console.log('Erro desconhecido');

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

      if (!findEvent) return console.log(`Evento ${id} nao encontrado`);

      return console.table(findEvent);
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

      if (!findEvent) {
        return console.log(
          `Eventos criados por: ${eventCreatorParam} nao encontrados`,
        );
      }

      return console.table(findEvent);
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
          date: dateParam,
        },
      });

      if (!findEvent) {
        return console.log(`Eventos do dia: ${dateParam} nao encontrado`);
      }

      return console.table(findEvent);
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
          hour: hourParam,
        },
      });

      if (!findEvent) {
        return console.log(`Eventos da hora: ${hourParam} nao encontrados`);
      }

      return console.table(findEvent);
    } catch (e) {
      console.log(e);
    }
  }

  public async SearchByName(nameParam: string) {
    try {
      const employeeVerify = await this.EmployeeLoginVerify();
      if (employeeVerify === false) return console.log(this.errorMsg);

      if (!employeeVerify) return console.log('Erro desconhecido');

      const findEvent = await prisma.event.findUnique({
        where: {
          name: nameParam,
        },
      });

      if (!findEvent) {
        return console.log(`Evento: ${nameParam} nao encontrado`);
      }

      return console.table(findEvent);
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
          hosts: hostsParam,
        },
      });

      if (!findEvent) {
        return console.log(
          `Eventos com os anfitrioes: ${hostsParam} nao encontrados`,
        );
      }

      return console.table(findEvent);
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

      if (!findEvent) {
        return console.log(
          `Eventos no local: ${locationParam} nao encontrados`,
        );
      }

      return console.table(findEvent);
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

      if (!findEvent) {
        return console.log(
          `Eventos na plataforma: ${plattformParam} nao encontrados`,
        );
      }

      return console.table(findEvent);
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

      if (!findEvent) {
        return console.log(
          `Eventos criados pelo funcionário: ${eventCreatorIdParam} nao encontrados`,
        );
      }

      return console.table(findEvent);
    } catch (e) {
      console.log(e);
    }
  }
}
