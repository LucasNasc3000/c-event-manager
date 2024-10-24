"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decisions = void 0;
const EmployeeFactory_1 = require("./Employees/EmployeeFactory");
const Event_1 = require("./Events/Event");
const EventSearchFilter_1 = require("./Events/EventSearchFilter");
async function Decisions(options) {
    const uf = new EmployeeFactory_1.EmployeeFactory();
    const event = new Event_1.Event();
    if (options.cadmin) {
        const uf = new EmployeeFactory_1.EmployeeFactory(process.env.ADMIN_USER, process.env.ADMIN_USER);
        await uf.UserCreate();
    }
    if (options.adminlog) {
        const uf = new EmployeeFactory_1.EmployeeFactory(process.argv[3], process.argv[4]);
        const adminLog = await uf.Login();
        return adminLog;
    }
    if (options.emplog) {
        const uf = new EmployeeFactory_1.EmployeeFactory(process.argv[3], process.argv[4]);
        const employeeLogin = await uf.Login();
        return employeeLogin;
    }
    if (options.logout) {
        const adminLogout = uf.AdminLogout();
        return adminLogout;
    }
    if (options.elogout) {
        const uf = new EmployeeFactory_1.EmployeeFactory(process.argv[3]);
        uf.EmployeeLogout();
    }
    if (options.createUser) {
        const uf = new EmployeeFactory_1.EmployeeFactory(process.argv[3], process.argv[4], process.argv[5]);
        const user = await uf.UserCreate();
        return user;
    }
    if (options.updateUsers) {
        const data = [process.argv[4], process.argv[5]];
        await uf.EmployeeUpdate(process.argv[3], data);
    }
    if (options.searchUser)
        uf.Search(process.argv[3], process.argv[4]);
    if (options.logsList)
        uf.LogsList();
    if (options.logoutsList)
        uf.LogoutsList();
    if (options.readUsers)
        uf.EmployeesList();
    if (options.deleteUsers)
        await uf.Delete(process.argv[3]);
    if (options.logsEmailSearch)
        await uf.LogSearchEmail(process.argv[3]);
    if (options.logsDateSearch)
        await uf.LogSearchDate(process.argv[3]);
    if (options.logsHourSearch)
        await uf.LogSearchHour(process.argv[3]);
    if (options.logoutsEmailSearch)
        await uf.LogoutSearchEmail(process.argv[3]);
    if (options.logoutsDateSearch)
        await uf.LogoutSearchDate(process.argv[3]);
    if (options.logoutsHourSearch)
        await uf.LogoutSearchHour(process.argv[3]);
    if (options.createEvent) {
        const data = [
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
    if (options.readEvent)
        await event.List();
    if (options.updateEvent) {
        const data = [
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
    if (options.deleteEvent)
        await event.Delete(process.argv[3]);
    if (options.searchEvent) {
        const filter = new EventSearchFilter_1.EventSearchFilter(process.argv[3], process.argv[4]);
        await filter.Filter();
    }
}
exports.Decisions = Decisions;
