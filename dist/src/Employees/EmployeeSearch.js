"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeSearch = void 0;
const prisma_1 = require("../../lib/prisma");
class EmployeeSearch {
    constructor(_adminLoginVerify, _verifyResult) {
        this._adminLoginVerify = _adminLoginVerify;
        this._verifyResult = _verifyResult;
    }
    Verify() {
        throw new Error('Method not implemented.');
    }
    async SearchById(id, isSearch = true) {
        try {
            const admLoginVerify = await this._adminLoginVerify.Verify();
            this._verifyResult.Result(null, admLoginVerify);
            const findEmployee = await prisma_1.prisma.employee.findUnique({
                where: {
                    id: id,
                },
            });
            return this.SearchResult(findEmployee, [], isSearch, 'Funcionário não encontrado');
        }
        catch (e) {
            return console.log(e);
        }
    }
    async SearchByEmail(email) {
        try {
            const admLoginVerify = await this._adminLoginVerify.Verify();
            this._verifyResult.Result(null, admLoginVerify);
            const findEmployee = await prisma_1.prisma.employee.findUnique({
                where: {
                    email: email,
                },
            });
            return this.SearchResult(findEmployee, [], true, `Funcionario com email "${email}" nao encontrado`);
        }
        catch (e) {
            return console.log(e);
        }
    }
    async SearchByName(name, isSearch) {
        try {
            const admLoginVerify = await this._adminLoginVerify.Verify();
            this._verifyResult.Result(null, admLoginVerify);
            const findEmployee = await prisma_1.prisma.employee.findMany({
                where: {
                    name: {
                        startsWith: name,
                    },
                },
            });
            return this.SearchResult(null, findEmployee, isSearch, `Funcionarios com o nome "${name}" nao encontrados`);
        }
        catch (e) {
            return console.log(e);
        }
    }
    SearchResult(searchData, searchDataArray, isSearch, error) {
        switch (true) {
            case isSearch === true &&
                searchData === null &&
                searchDataArray.length < 1:
                return console.log(error);
            case isSearch === true &&
                searchData === null &&
                searchDataArray.length > 0:
                return console.table(searchDataArray);
            case isSearch === true &&
                searchDataArray.length < 1 &&
                searchData !== null:
                return console.table(searchData);
            case isSearch === false &&
                searchDataArray.length > 0 &&
                searchData === null:
                return searchDataArray;
            case isSearch === false &&
                searchData !== null &&
                searchDataArray.length < 1:
                return searchData;
            case isSearch === false &&
                searchData === null &&
                searchDataArray.length < 1:
                throw new Error('Funcionário não encontrado');
        }
    }
}
exports.EmployeeSearch = EmployeeSearch;
