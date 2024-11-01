"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsSearch = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const prisma_1 = require("../../lib/prisma");
class LogsSearch {
    constructor(_adminLoginVerify, _verifyResult) {
        this._adminLoginVerify = _adminLoginVerify;
        this._verifyResult = _verifyResult;
    }
    async SearchById(id) {
        try {
            const admLoginVerify = await this._adminLoginVerify.Verify();
            this._verifyResult.Result(null, admLoginVerify);
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
    async SearchByEmail(emailSearchValue) {
        try {
            const admLoginVerify = await this._adminLoginVerify.Verify();
            this._verifyResult.Result(null, admLoginVerify);
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
    async SearchByDate(dateSearchValue) {
        try {
            const admLoginVerify = await this._adminLoginVerify.Verify();
            this._verifyResult.Result(null, admLoginVerify);
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
    async SearchByHour(hourSearchValue) {
        try {
            const admLoginVerify = await this._adminLoginVerify.Verify();
            this._verifyResult.Result(null, admLoginVerify);
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
