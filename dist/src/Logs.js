"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logs = void 0;
const prisma_1 = require("../lib/prisma");
class Logs {
    constructor(email, dateTime) {
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
}
exports.Logs = Logs;
