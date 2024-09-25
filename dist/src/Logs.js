"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logs = void 0;
const prisma_1 = require("../lib/prisma");
const Employee_1 = require("./Employee");
class Logs {
    constructor(email = '', dateTime = []) {
        this.dateTime = [];
        this.dateTime = dateTime;
        this.email = email;
    }
    async CreateLogin() {
        try {
            if (!this.email || this.email === '') {
                return console.log('Email não enviado');
            }
            if (!this.dateTime || this.dateTime.length < 1) {
                return console.log('Data e hora não foram enviadas');
            }
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
            if (!this.email || this.email === '') {
                return console.log('Email não enviado');
            }
            if (!this.dateTime || this.dateTime.length < 1) {
                return console.log('Data e hora não foram enviadas');
            }
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
    async LogSearchEmail(password, emailSearchValue) {
        try {
            const emp = new Employee_1.Employee('', this.email, password);
            const admLoginVerify = await emp.AdminLoginVerify();
            if (admLoginVerify === false) {
                return console.log('Operacao nao autorizada. Login do administrador necessario');
            }
            const findLog = await prisma_1.prisma.logsLogin.findMany({
                where: {
                    email: emailSearchValue,
                },
            });
            if (findLog.length < 1) {
                return console.log(`Logs do funcionário ${emailSearchValue} nao encontrados`);
            }
            return console.table(findLog);
        }
        catch (e) {
            return console.log(e);
        }
    }
    async LogSearchDate(password, dateSearchValue) {
        try {
            const emp = new Employee_1.Employee('', this.email, password);
            const admLoginVerify = await emp.AdminLoginVerify();
            if (admLoginVerify === false) {
                return console.log('Operacao nao autorizada. Login do administrador necessario');
            }
            const findLog = await prisma_1.prisma.logsLogin.findMany({
                where: {
                    loginDate: {
                        startsWith: dateSearchValue,
                    },
                },
            });
            if (findLog.length < 1) {
                return console.log(`Logs da data ${dateSearchValue} nao encontrados`);
            }
            return console.table(findLog);
        }
        catch (e) {
            return console.log(e);
        }
    }
    async LogSearchHour(password, hourSearchValue) {
        try {
            const emp = new Employee_1.Employee('', this.email, password);
            const admLoginVerify = await emp.AdminLoginVerify();
            if (admLoginVerify === false) {
                return console.log('Operacao nao autorizada. Login do administrador necessario');
            }
            const findLog = await prisma_1.prisma.logsLogin.findMany({
                where: {
                    loginHour: {
                        startsWith: hourSearchValue,
                    },
                },
            });
            if (findLog.length < 1) {
                return console.log(`Logs da data ${hourSearchValue} nao encontrados`);
            }
            return console.table(findLog);
        }
        catch (e) {
            return console.log(e);
        }
    }
}
exports.Logs = Logs;
