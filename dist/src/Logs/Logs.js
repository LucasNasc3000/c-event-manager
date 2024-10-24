"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logs = void 0;
const prisma_1 = require("../../lib/prisma");
const AdminLoginVerify_1 = require("../LoginVerify/AdminLoginVerify");
class Logs {
    constructor(email = '', dateTime = []) {
        this.dateTime = [];
        this.adminLoginVerify = new AdminLoginVerify_1.AdminLoginVerify();
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
    async ListLogins() {
        try {
            const admLoginVerify = await this.adminLoginVerify.Verify();
            if (admLoginVerify === false) {
                return console.log('Operacao nao autorizada. Login do administrador necessario');
            }
            const logsList = await prisma_1.prisma.logsLogin.findMany();
            if (logsList.length < 1) {
                return console.log('Ocorreu um erro ou não há loginsregistrados');
            }
            return console.table(logsList);
        }
        catch (e) {
            return console.log(e);
        }
    }
    async ListLogouts() {
        try {
            const admLoginVerify = await this.adminLoginVerify.Verify();
            if (admLoginVerify === false) {
                return console.log('Operacao nao autorizada. Login do administrador necessario');
            }
            const logsList = await prisma_1.prisma.logsLogout.findMany();
            if (logsList.length < 1) {
                return console.log('Ocorreu um erro ou não há logouts registrados');
            }
            return console.table(logsList);
        }
        catch (e) {
            return console.log(e);
        }
    }
}
exports.Logs = Logs;
