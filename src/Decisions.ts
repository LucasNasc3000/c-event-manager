/* eslint-disable no-case-declarations */
import { OptionValues } from 'commander';
import { EmployeeFactory } from './Employees/EmployeeFactory';
import { Event } from './Events/Event';

export async function Decisions(options: OptionValues) {
  const uf: EmployeeFactory = new EmployeeFactory();
  const event: Event = new Event();

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
    const data: string[] = [];

    data.push(process.argv[4], process.argv[5]);

    await uf.EmployeeUpdate(process.argv[3], data);
  }

  if (options.searchUsersId) {
    const EmployeeFinder = uf.Search(process.argv[3]);
    return EmployeeFinder;
  }

  if (options.searchUsersEmail) {
    const EmployeeFinder = uf.Search(process.argv[3]);
    return EmployeeFinder;
  }

  if (options.searchUsersName) {
    const EmployeeFinder = uf.Search(process.argv[3]);
    return EmployeeFinder;
  }

  if (options.logsList) uf.LogsList();

  if (options.logoutsList) uf.LogoutsList();

  if (options.readUsers) await uf.EmployeesList();

  if (options.deleteUsers) await uf.Delete(process.argv[3]);

  if (options.logsEmailSearch) await uf.LogSearchEmail(process.argv[3]);

  if (options.logsDateSearch) await uf.LogSearchDate(process.argv[3]);

  if (options.logsHourSearch) await uf.LogSearchHour(process.argv[3]);

  if (options.logoutsEmailSearch) await uf.LogoutSearchEmail(process.argv[3]);

  if (options.logoutsDateSearch) await uf.LogoutSearchDate(process.argv[3]);

  if (options.logoutsHourSearch) await uf.LogoutSearchHour(process.argv[3]);

  if (options.createEvent) {
    const event = new Event(
      process.argv[3],
      process.argv[4],
      process.argv[5],
      process.argv[6],
      process.argv[7],
      process.argv[8],
      process.argv[9],
      process.argv[10],
      process.argv[11],
      process.argv[12],
      process.argv[13],
    );

    const create = event.Create();
    return create;
  }

  if (options.readEvent) await event.List();
}

// export function test(arg1: string, whichData: string) {
//   switch (whichData) {
//     case 'name':
//       const fbn = new EmployeeFactory('', '', arg1);
//       return fbn;
//   }
// }
