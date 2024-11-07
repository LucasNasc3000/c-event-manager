/* eslint-disable no-case-declarations */
import { OptionValues } from 'commander';
import { EmployeeFactory } from './Employees/EmployeeFactory';
import { Event } from './Events/Event';
import { EventSearchFilter } from './Events/EventSearchFilter';
import { LogFactory } from './Logs/LogFactory';
import { AdminLoginVerify } from './LoginVerify/AdminLoginVerify';
import { EmployeeLoginVerify } from './LoginVerify/EmployeeLoginVerify';
import { VerifyResult } from './LoginVerify/VerifyResult';
import { EventSearch } from './Events/EventSearch';

export async function Decisions(options: OptionValues) {
  if (options.cadmin) {
    const uf = new EmployeeFactory(
      process.argv[3],
      process.argv[4],
      process.argv[5],
    );
    uf.Create();
  }

  if (options.adminlog) {
    const uf = new EmployeeFactory('', process.argv[3], process.argv[4]);
    uf.Login();
  }

  if (options.emplog) {
    const uf = new EmployeeFactory('', process.argv[3], process.argv[4]);
    uf.Login();
  }

  if (options.logout) {
    const uf = new EmployeeFactory();
    uf.AdminLogout();
  }

  if (options.elogout) {
    const uf = new EmployeeFactory('', process.argv[3]);
    uf.Logout();
  }

  if (options.createUser) {
    const uf = new EmployeeFactory(
      process.argv[3],
      process.argv[4],
      process.argv[5],
    );
    uf.Create();
  }

  if (options.updateUser) {
    const uf = new EmployeeFactory();

    const data: string[] = [process.argv[4], process.argv[5]];
    uf.Update(process.argv[3], data);
  }

  if (options.readUsers) {
    const uf = new EmployeeFactory();
    uf.List();
  }

  if (options.deleteUser) {
    const uf = new EmployeeFactory();
    uf.Delete(process.argv[3], process.argv[4]);
  }

  if (options.searchUser) {
    const uf = new EmployeeFactory();
    uf.Search(process.argv[3], process.argv[4]);
  }

  if (options.logsList) {
    const logs: LogFactory = new LogFactory(true);
    logs.List();
  }

  if (options.logoutsList) {
    const logs: LogFactory = new LogFactory(false);
    logs.List();
  }

  if (options.logsSearch) {
    const logSearch: LogFactory = new LogFactory(
      true,
      process.argv[3],
      process.argv[4],
    );
    logSearch.Filter();
  }

  if (options.logoutsSearch) {
    const logSearch: LogFactory = new LogFactory(
      false,
      process.argv[3],
      process.argv[4],
    );
    logSearch.Filter();
  }

  if (options.createEvent) {
    const adminVerify: AdminLoginVerify = new AdminLoginVerify();
    const employeeVerify: EmployeeLoginVerify = new EmployeeLoginVerify();
    const resultVerify: VerifyResult = new VerifyResult();

    const event: Event = new Event(adminVerify, employeeVerify, resultVerify);

    const data: string[] = [
      process.argv[3],
      process.argv[4],
      process.argv[5],
      process.argv[6],
      process.argv[7],
      process.argv[8],
      process.argv[9],
      process.argv[10],
      process.argv[11],
    ];
    event.Create(data);
  }

  if (options.readEvent) {
    const adminVerify: AdminLoginVerify = new AdminLoginVerify();
    const employeeVerify: EmployeeLoginVerify = new EmployeeLoginVerify();
    const resultVerify: VerifyResult = new VerifyResult();

    const event: Event = new Event(adminVerify, employeeVerify, resultVerify);

    event.List();
  }

  if (options.updateEvent) {
    const adminVerify: AdminLoginVerify = new AdminLoginVerify();
    const employeeVerify: EmployeeLoginVerify = new EmployeeLoginVerify();
    const resultVerify: VerifyResult = new VerifyResult();

    const event: Event = new Event(adminVerify, employeeVerify, resultVerify);

    const data: string[] = [
      process.argv[4],
      process.argv[5],
      process.argv[6],
      process.argv[7],
      process.argv[8],
      process.argv[9],
      process.argv[10],
      process.argv[11],
    ];

    event.Update(process.argv[3], data);
  }

  if (options.deleteEvent) {
    const adminVerify: AdminLoginVerify = new AdminLoginVerify();
    const employeeVerify: EmployeeLoginVerify = new EmployeeLoginVerify();
    const resultVerify: VerifyResult = new VerifyResult();

    const event: Event = new Event(adminVerify, employeeVerify, resultVerify);

    event.Delete(process.argv[3]);
  }

  if (options.searchEvent) {
    const adminVerify: AdminLoginVerify = new AdminLoginVerify();
    const employeeVerify: EmployeeLoginVerify = new EmployeeLoginVerify();
    const resultVerify: VerifyResult = new VerifyResult();

    const eventSearch: EventSearch = new EventSearch(
      adminVerify,
      employeeVerify,
      resultVerify,
    );

    const filter = new EventSearchFilter(
      process.argv[3],
      process.argv[4],
      eventSearch,
    );
    filter.Filter();
  }

  if (options.params) {
    console.log('Exemplos: ');

    const employee = {
      entity: 'EMPLOYEES',
      name: 'Osvaldo - Nome único',
      email: 'osvaldo@mail.com - Email único',
      password: '12345678',
    };

    const logs = {
      entity: 'LOGS',
      email: 'osvaldo@mail.com',
      loginOrlogoutDate: '03/03/2023',
      loginOrlogoutHour: '18:30:00',
    };

    const events = {
      entity: 'EVENTS',
      eventCreator: 'Gilberto',
      date: '03/03/2023',
      hour: '18:30:00',
      name: 'boas-vindas',
      hosts: 'João,Gabriel,Paula',
      modality: 'online/presencial',
      location: 'Rua dos Tatus, 256 - São Paulo - Brasil/null',
      plattform: 'google-meet/null',
      eventCreatorId: 'uuid do funcionário que criou o evento',
    };

    console.table(employee);
    console.table(logs);
    console.table(events);
  }
}
