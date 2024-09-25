/* eslint-disable no-case-declarations */
import { OptionValues } from 'commander';
import { EmployeeFactory } from './EmployeeFactory';

export async function Decisions(options: OptionValues) {
  const uf: EmployeeFactory = new EmployeeFactory();

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
}

// export function test(arg1: string, whichData: string) {
//   switch (whichData) {
//     case 'name':
//       const fbn = new EmployeeFactory('', '', arg1);
//       return fbn;
//   }
// }
