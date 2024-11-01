"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logouts = void 0;
const prisma_1 = require("../../lib/prisma");
const AdminLoginVerify_1 = require("../LoginVerify/AdminLoginVerify");
const VerifyResult_1 = require("../LoginVerify/VerifyResult");
class Logouts {
    constructor(_email = '', _dateTime = []) {
        this._email = _email;
        this._dateTime = _dateTime;
    }
    async Create() {
        try {
            if (!this._email || this._email === '') {
                return console.log('Email não enviado');
            }
            if (!this._dateTime || this._dateTime.length < 1) {
                return console.log('Data e hora não foram enviadas');
            }
            await prisma_1.prisma.logsLogout.create({
                data: {
                    email: this._email,
                    logoutDate: this._dateTime[0],
                    logoutHour: this._dateTime[1],
                },
            });
        }
        catch (e) {
            return console.log(e);
        }
    }
    async List() {
        try {
            const admLoginVerify = new AdminLoginVerify_1.AdminLoginVerify();
            const verifyResult = new VerifyResult_1.VerifyResult();
            await admLoginVerify.Verify();
            verifyResult.Result(null, admLoginVerify);
            const logoutsList = await prisma_1.prisma.logsLogout.findMany();
            if (logoutsList.length < 1) {
                return console.log('Ocorreu um erro ou não há logouts registrados');
            }
            return console.table(logoutsList);
        }
        catch (e) {
            return console.log(e);
        }
    }
}
exports.Logouts = Logouts;
