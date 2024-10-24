/* eslint-disable no-case-declarations */
import { OptionValues } from 'commander';
import { EmployeeFactory } from './Employees/EmployeeFactory';
import { Event } from './Events/Event';
import { EventSearchFilter } from './Events/EventSearchFilter';
import { Logs } from './Logs/Logs';
import { LogsSearchFilter } from './Logs/LogsSearchFilter';

export async function Decisions(options: OptionValues) {
  const uf: EmployeeFactory = new EmployeeFactory();
  const event: Event = new Event();
  const logs: Logs = new Logs();

  if (options.cadmin) {
    const uf = new EmployeeFactory(
      process.env.ADMIN_USER as string,
      process.env.ADMIN_USER as string,
    );
    await uf.UserCreate();
  }

  if (options.adminlog) {
    const uf = new EmployeeFactory(process.argv[3], process.argv[4]);
    const adminLog = await uf.Login();
    return adminLog;
  }

  if (options.emplog) {
    const uf = new EmployeeFactory(process.argv[3], process.argv[4]);
    const employeeLogin = await uf.Login();
    return employeeLogin;
  }

  if (options.logout) {
    const adminLogout = uf.AdminLogout();
    return adminLogout;
  }

  if (options.elogout) {
    const uf = new EmployeeFactory(process.argv[3]);
    uf.EmployeeLogout();
  }

  if (options.createUser) {
    const uf = new EmployeeFactory(
      process.argv[3],
      process.argv[4],
      process.argv[5],
    );
    const user = await uf.UserCreate();
    return user;
  }

  if (options.updateUsers) {
    const data: string[] = [process.argv[4], process.argv[5]];
    await uf.EmployeeUpdate(process.argv[3], data);
  }

  if (options.searchUser) uf.Search(process.argv[3], process.argv[4]);

  if (options.logsList) logs.ListLogins();

  if (options.logoutsList) logs.ListLogouts();

  if (options.logsSearch) {
    const logSearch: LogsSearchFilter = new LogsSearchFilter(
      process.argv[3],
      process.argv[4],
    );

    logSearch.Filter();
  }

  if (options.readUsers) uf.EmployeesList();

  if (options.deleteUsers) await uf.Delete(process.argv[3]);

  if (options.createEvent) {
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
    const create = event.Create(data);
    return create;
  }

  if (options.readEvent) await event.List();

  if (options.updateEvent) {
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

    await event.Update(process.argv[3], data);
  }

  if (options.deleteEvent) await event.Delete(process.argv[3]);

  if (options.searchEvent) {
    const filter = new EventSearchFilter(process.argv[3], process.argv[4]);
    await filter.Filter();
  }
}
