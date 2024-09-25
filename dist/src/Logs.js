"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logs = void 0;
const prisma_1 = require("../lib/prisma");
const Employee_1 = require("./Employee");
class Logs {
    constructor(email, dateTime = []) {
        this.dateTime = [];
        this.dateTime = dateTime;
        this.email = email;
    }
    async CreateLogin() {
        try {
            await prisma_1.prisma.logsLogin.create({
                data: {
                    email: this.email,
                    loginDate: this.dateTime[0],
                    loginHour: this.dateTime[1],
                },
            });
        }
        catch (e) {
            return console.log(e);
        }
    }
    async CreateLogout() {
        try {
            await prisma_1.prisma.logsLogout.create({
                data: {
                    email: this.email,
                    logoutDate: this.dateTime[0],
                    logoutHour: this.dateTime[1],
                },
            });
        }
        catch (e) {
            return console.log(e);
        }
    }
    async ListLogins(password) {
        try {
            const emp = new Employee_1.Employee('', this.email, password);
            const admLoginVerify = await emp.AdminLoginVerify();
            if (admLoginVerify === false) {
                return console.log('Operacao nao autorizada. Login do administrador necessario');
            }
            const logsList = await prisma_1.prisma.logsLogin.findMany();
            return console.table(logsList);
        }
        catch (e) {
            return console.log(e);
        }
    }
    async ListLogouts(password) {
        try {
            const emp = new Employee_1.Employee('', this.email, password);
            const admLoginVerify = await emp.AdminLoginVerify();
            if (admLoginVerify === false) {
                return console.log('Operacao nao autorizada. Login do administrador necessario');
            }
            const logsList = await prisma_1.prisma.logsLogout.findMany();
            return console.table(logsList);
        }
        catch (e) {
            return console.log(e);
        }
    }
}
exports.Logs = Logs;
