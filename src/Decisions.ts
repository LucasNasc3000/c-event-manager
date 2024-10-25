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
    uf.UserCreate();
  }

  if (options.adminlog) {
    const uf = new EmployeeFactory(process.argv[3], process.argv[4]);
    uf.Login();
  }

  if (options.emplog) {
    const uf = new EmployeeFactory(process.argv[3], process.argv[4]);
    uf.Login();
  }

  if (options.logout) {
    uf.AdminLogout();
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
    uf.UserCreate();
  }

  if (options.updateUsers) {
    const data: string[] = [process.argv[4], process.argv[5]];
    uf.EmployeeUpdate(process.argv[3], data);
  }

  if (options.searchUser) uf.Search(process.argv[3], process.argv[4]);

  if (options.logsList) {
    logs.ListLogins();
    console.log(process.argv[0]);
  }

  if (options.logoutsList) logs.ListLogouts();

  if (options.logsSearch) {
    const logSearch: LogsSearchFilter = new LogsSearchFilter(
      process.argv[3],
      process.argv[4],
    );

    logSearch.Filter();
  }

  if (options.readUsers) uf.EmployeesList();

  if (options.deleteUsers) uf.Delete(process.argv[3]);

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
    event.Create(data);
  }

  if (options.readEvent) event.List();

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

    event.Update(process.argv[3], data);
  }

  if (options.deleteEvent) event.Delete(process.argv[3]);

  if (options.searchEvent) {
    const filter = new EventSearchFilter(process.argv[3], process.argv[4]);
    filter.Filter();
  }
}
