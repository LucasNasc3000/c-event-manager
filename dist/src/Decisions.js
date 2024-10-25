"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decisions = void 0;
const EmployeeFactory_1 = require("./Employees/EmployeeFactory");
const Event_1 = require("./Events/Event");
const EventSearchFilter_1 = require("./Events/EventSearchFilter");
const Logs_1 = require("./Logs/Logs");
const LogsSearchFilter_1 = require("./Logs/LogsSearchFilter");
async function Decisions(options) {
    const uf = new EmployeeFactory_1.EmployeeFactory();
    const event = new Event_1.Event();
    const logs = new Logs_1.Logs();
    if (options.cadmin) {
        const uf = new EmployeeFactory_1.EmployeeFactory(process.env.ADMIN_USER, process.env.ADMIN_USER);
        uf.UserCreate();
    }
    if (options.adminlog) {
        const uf = new EmployeeFactory_1.EmployeeFactory(process.argv[3], process.argv[4]);
        uf.Login();
    }
    if (options.emplog) {
        const uf = new EmployeeFactory_1.EmployeeFactory(process.argv[3], process.argv[4]);
        uf.Login();
    }
    if (options.logout) {
        uf.AdminLogout();
    }
    if (options.elogout) {
        const uf = new EmployeeFactory_1.EmployeeFactory(process.argv[3]);
        uf.EmployeeLogout();
    }
    if (options.createUser) {
        const uf = new EmployeeFactory_1.EmployeeFactory(process.argv[3], process.argv[4], process.argv[5]);
        uf.UserCreate();
    }
    if (options.updateUsers) {
        const data = [process.argv[4], process.argv[5]];
        uf.EmployeeUpdate(process.argv[3], data);
    }
    if (options.searchUser)
        uf.Search(process.argv[3], process.argv[4]);
    if (options.logsList) {
        logs.ListLogins();
        console.log(process.argv[0]);
    }
    if (options.logoutsList)
        logs.ListLogouts();
    if (options.logsSearch) {
        const logSearch = new LogsSearchFilter_1.LogsSearchFilter(process.argv[3], process.argv[4]);
        logSearch.Filter();
    }
    if (options.readUsers)
        uf.EmployeesList();
    if (options.deleteUsers)
        uf.Delete(process.argv[3]);
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
        event.Create(data);
    }
    if (options.readEvent)
        event.List();
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
        event.Update(process.argv[3], data);
    }
    if (options.deleteEvent)
        event.Delete(process.argv[3]);
    if (options.searchEvent) {
        const filter = new EventSearchFilter_1.EventSearchFilter(process.argv[3], process.argv[4]);
        filter.Filter();
    }
}
exports.Decisions = Decisions;
