import { OptionValues } from 'commander';
import { UserFactory } from './EmployeeFactory';

export async function Decisions(options: OptionValues) {
  const uf = new UserFactory();

  if (options.cadmin) {
    const uf = new UserFactory(
      process.env.ADMIN_USER as string,
      process.env.ADMIN_USER as string,
    );
    const classes = await uf.UserCreate();
    return classes;
  }

  if (options.adminlog) {
    const uf = new UserFactory(process.argv[3], process.argv[4]);
    const adminLog = await uf.Login();
    return adminLog;
  }

  if (options.emplog) {
    const uf = new UserFactory(process.argv[3], process.argv[4]);
    const employeeLogin = await uf.Login();
    return employeeLogin;
  }

  if (options.logout) {
    const adminLogout = uf.adminLogout();
    return adminLogout;
  }

  if (options.elogout) {
    const uf = new UserFactory(process.argv[3]);
    const logout = uf.employeeLogout();
    return logout;
  }

  if (options.createUser) {
    const uf = new UserFactory(
      process.argv[3],
      process.argv[4],
      process.argv[5],
    );
    const user = await uf.UserCreate();
    return user;
  }

  if (options.readUsers) {
    const list = await uf.employeesList();
    return list;
  }

  if (options.updateUsers) {
    const data: string[] = [];

    data.push(process.argv[4], process.argv[5]);

    await uf.employeeUpdate(process.argv[3], data);
  }

  if (options.deleteUsers) {
    await uf.Delete(process.argv[3]);
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
}
