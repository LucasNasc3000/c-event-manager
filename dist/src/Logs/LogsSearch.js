"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsSearch = void 0;
const prisma_1 = require("../../lib/prisma");
const AdminLoginVerify_1 = require("../LoginVerify/AdminLoginVerify");
const VerifyResult_1 = require("../LoginVerify/VerifyResult");
class LogsSearch {
    constructor() {
        this.adminLoginVerify = new AdminLoginVerify_1.AdminLoginVerify();
        this.verifyResult = new VerifyResult_1.VerifyResult();
    }
    async LogSearchId(id) {
        try {
            const admLoginVerify = await this.adminLoginVerify.Verify();
            this.verifyResult.Result(null, admLoginVerify);
            const findLog = await prisma_1.prisma.logsLogin.findUnique({
                where: {
                    id: id,
                },
            });
            return this.SearchResult(findLog, [], `Log ${id} nao encontrado`);
        }
        catch (e) {
            return console.log(e);
        }
    }
    async LogSearchEmail(emailSearchValue) {
        try {
            const admLoginVerify = await this.adminLoginVerify.Verify();
            this.verifyResult.Result(null, admLoginVerify);
            const findLog = await prisma_1.prisma.logsLogin.findMany({
                where: {
                    email: emailSearchValue,
                },
            });
            return this.SearchResult(null, findLog, `Logs do funcionário ${emailSearchValue} nao encontrados`);
        }
        catch (e) {
            return console.log(e);
        }
    }
    async LogSearchDate(dateSearchValue) {
        try {
            const admLoginVerify = await this.adminLoginVerify.Verify();
            this.verifyResult.Result(null, admLoginVerify);
            const findLog = await prisma_1.prisma.logsLogin.findMany({
                where: {
                    loginDate: {
                        startsWith: dateSearchValue,
                    },
                },
            });
            return this.SearchResult(null, findLog, `Logs da data ${dateSearchValue} nao encontrados`);
        }
        catch (e) {
            return console.log(e);
        }
    }
    async LogSearchHour(hourSearchValue) {
        try {
            const admLoginVerify = await this.adminLoginVerify.Verify();
            this.verifyResult.Result(null, admLoginVerify);
            const findLog = await prisma_1.prisma.logsLogin.findMany({
                where: {
                    loginHour: {
                        startsWith: hourSearchValue,
                    },
                },
            });
            return this.SearchResult(null, findLog, `Logs da data ${hourSearchValue} nao encontrados`);
        }
        catch (e) {
            return console.log(e);
        }
    }
    async LogoutSearchId(id) {
        try {
            const admLoginVerify = await this.adminLoginVerify.Verify();
            this.verifyResult.Result(null, admLoginVerify);
            const findLogout = await prisma_1.prisma.logsLogout.findUnique({
                where: {
                    id: id,
                },
            });
            return this.SearchResult(findLogout, [], `Logout ${id} não encontrado`);
        }
        catch (e) {
            return console.log(e);
        }
    }
    async LogoutSearchEmail(emailSearchValue) {
        try {
            const admLoginVerify = await this.adminLoginVerify.Verify();
            this.verifyResult.Result(null, admLoginVerify);
            const findLogout = await prisma_1.prisma.logsLogout.findMany({
                where: {
                    email: emailSearchValue,
                },
            });
            return this.SearchResult(null, findLogout, `Logouts do funcionário ${emailSearchValue} nao encontrados`);
        }
        catch (e) {
            return console.log(e);
        }
    }
    async LogoutSearchDate(dateSearchValue) {
        try {
            const admLoginVerify = await this.adminLoginVerify.Verify();
            this.verifyResult.Result(null, admLoginVerify);
            const findLogout = await prisma_1.prisma.logsLogout.findMany({
                where: {
                    logoutDate: {
                        startsWith: dateSearchValue,
                    },
                },
            });
            return this.SearchResult(null, findLogout, `Logouts da data ${dateSearchValue} nao encontrados`);
        }
        catch (e) {
            return console.log(e);
        }
    }
    async LogoutSearchHour(hourSearchValue) {
        try {
            const admLoginVerify = await this.adminLoginVerify.Verify();
            this.verifyResult.Result(null, admLoginVerify);
            const findLogout = await prisma_1.prisma.logsLogout.findMany({
                where: {
                    logoutHour: {
                        startsWith: hourSearchValue,
                    },
                },
            });
            return this.SearchResult(null, findLogout, `Logouts da data ${hourSearchValue} nao encontrados`);
        }
        catch (e) {
            return console.log(e);
        }
    }
    SearchResult(searchData, searchDataArray, error) {
        switch (true) {
            case searchData === null && searchDataArray.length < 1:
                return console.log(error);
            case searchData === null && searchDataArray.length > 0:
                return console.table(searchDataArray);
            case searchDataArray.length < 1 && searchData !== null:
                return console.table(searchData);
        }
    }
}
exports.LogsSearch = LogsSearch;
