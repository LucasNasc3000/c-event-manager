"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decisions = void 0;
const EmployeeFactory_1 = require("./Employees/EmployeeFactory");
const Event_1 = require("./Events/Event");
const EventSearchFilter_1 = require("./Events/EventSearchFilter");
const LogFactory_1 = require("./Logs/LogFactory");
const AdminLoginVerify_1 = require("./LoginVerify/AdminLoginVerify");
const EmployeeLoginVerify_1 = require("./LoginVerify/EmployeeLoginVerify");
const VerifyResult_1 = require("./LoginVerify/VerifyResult");
const EventSearch_1 = require("./Events/EventSearch");
async function Decisions(options) {
    if (options.cadmin) {
        const uf = new EmployeeFactory_1.EmployeeFactory(process.argv[3], process.argv[4], process.argv[5]);
        uf.Create();
    }
    if (options.adminlog) {
        const uf = new EmployeeFactory_1.EmployeeFactory('', process.argv[3], process.argv[4]);
        uf.Login();
    }
    if (options.emplog) {
        const uf = new EmployeeFactory_1.EmployeeFactory('', process.argv[3], process.argv[4]);
        uf.Login();
    }
    if (options.logout) {
        const uf = new EmployeeFactory_1.EmployeeFactory();
        uf.AdminLogout();
    }
    if (options.elogout) {
        const uf = new EmployeeFactory_1.EmployeeFactory('', process.argv[3]);
        uf.Logout();
    }
    if (options.createUser) {
        const uf = new EmployeeFactory_1.EmployeeFactory(process.argv[3], process.argv[4], process.argv[5]);
        uf.Create();
    }
    if (options.updateUsers) {
        const uf = new EmployeeFactory_1.EmployeeFactory();
        const data = [process.argv[4], process.argv[5]];
        uf.Update(process.argv[3], data);
    }
    if (options.searchUser) {
        const uf = new EmployeeFactory_1.EmployeeFactory();
        uf.Search(process.argv[3], process.argv[4]);
    }
    if (options.logsList) {
        const logs = new LogFactory_1.LogFactory(true);
        logs.List();
    }
    if (options.logoutsList) {
        const logs = new LogFactory_1.LogFactory(false);
        logs.List();
    }
    if (options.logsSearch) {
        const logSearch = new LogFactory_1.LogFactory(true, process.argv[3], process.argv[4]);
        logSearch.Filter();
    }
    if (options.logoutsSearch) {
        const logSearch = new LogFactory_1.LogFactory(false, process.argv[3], process.argv[4]);
        logSearch.Filter();
    }
    if (options.readUsers) {
        const uf = new EmployeeFactory_1.EmployeeFactory();
        uf.List();
    }
    if (options.deleteUsers) {
        const uf = new EmployeeFactory_1.EmployeeFactory();
        uf.Delete(process.argv[3], process.argv[4]);
    }
    if (options.createEvent) {
        const adminVerify = new AdminLoginVerify_1.AdminLoginVerify();
        const employeeVerify = new EmployeeLoginVerify_1.EmployeeLoginVerify();
        const resultVerify = new VerifyResult_1.VerifyResult();
        const event = new Event_1.Event(adminVerify, employeeVerify, resultVerify);
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
    if (options.readEvent) {
        const adminVerify = new AdminLoginVerify_1.AdminLoginVerify();
        const employeeVerify = new EmployeeLoginVerify_1.EmployeeLoginVerify();
        const resultVerify = new VerifyResult_1.VerifyResult();
        const event = new Event_1.Event(adminVerify, employeeVerify, resultVerify);
        event.List();
    }
    if (options.updateEvent) {
        const adminVerify = new AdminLoginVerify_1.AdminLoginVerify();
        const employeeVerify = new EmployeeLoginVerify_1.EmployeeLoginVerify();
        const resultVerify = new VerifyResult_1.VerifyResult();
        const event = new Event_1.Event(adminVerify, employeeVerify, resultVerify);
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
    if (options.deleteEvent) {
        const adminVerify = new AdminLoginVerify_1.AdminLoginVerify();
        const employeeVerify = new EmployeeLoginVerify_1.EmployeeLoginVerify();
        const resultVerify = new VerifyResult_1.VerifyResult();
        const event = new Event_1.Event(adminVerify, employeeVerify, resultVerify);
        event.Delete(process.argv[3]);
    }
    if (options.searchEvent) {
        const adminVerify = new AdminLoginVerify_1.AdminLoginVerify();
        const employeeVerify = new EmployeeLoginVerify_1.EmployeeLoginVerify();
        const resultVerify = new VerifyResult_1.VerifyResult();
        const eventSearch = new EventSearch_1.EventSearch(adminVerify, employeeVerify, resultVerify);
        const filter = new EventSearchFilter_1.EventSearchFilter(process.argv[3], process.argv[4], eventSearch);
        filter.Filter();
    }
}
exports.Decisions = Decisions;
