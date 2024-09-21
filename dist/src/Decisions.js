"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = exports.Decisions = void 0;
const EmployeeFactory_1 = require("./EmployeeFactory");
async function Decisions(options) {
    const uf = new EmployeeFactory_1.UserFactory();
    if (options.cadmin) {
        const uf = new EmployeeFactory_1.UserFactory(process.env.ADMIN_USER, process.env.ADMIN_USER);
        const classes = await uf.UserCreate();
        return classes;
    }
    if (options.adminlog) {
        const uf = new EmployeeFactory_1.UserFactory(process.argv[3], process.argv[4]);
        const adminLog = await uf.Login();
        return adminLog;
    }
    if (options.emplog) {
        const uf = new EmployeeFactory_1.UserFactory(process.argv[3], process.argv[4]);
        const employeeLogin = await uf.Login();
        return employeeLogin;
    }
    if (options.logout) {
        const adminLogout = uf.adminLogout();
        return adminLogout;
    }
    if (options.elogout) {
        const uf = new EmployeeFactory_1.UserFactory(process.argv[3]);
        const logout = uf.employeeLogout();
        return logout;
    }
    if (options.createUser) {
        const uf = new EmployeeFactory_1.UserFactory(process.argv[3], process.argv[4], process.argv[5]);
        const user = await uf.UserCreate();
        return user;
    }
    if (options.readUsers) {
        const list = await uf.employeesList();
        return list;
    }
    if (options.updateUsers) {
        const data = [];
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
exports.Decisions = Decisions;
function test(arg1, whichData) {
    switch (whichData) {
        case 'name':
            const fbn = new EmployeeFactory_1.UserFactory('', '', arg1);
            return fbn;
    }
}
exports.test = test;
