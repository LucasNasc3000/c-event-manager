"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeSearch = void 0;
const prisma_1 = require("../../lib/prisma");
const AdminLoginVerify_1 = require("../LoginVerify/AdminLoginVerify");
const VerifyResult_1 = require("../LoginVerify/VerifyResult");
class EmployeeSearch {
    constructor() {
        this.adminLoginVerify = new AdminLoginVerify_1.AdminLoginVerify();
        this.verifyResult = new VerifyResult_1.VerifyResult();
    }
    async SearchById(id) {
        try {
            const admLoginVerify = await this.adminLoginVerify.Verify();
            this.verifyResult.Result(null, admLoginVerify);
            const findEmployee = await prisma_1.prisma.employee.findUnique({
                where: {
                    id: id,
                },
            });
            return this.SearchResult(findEmployee, [], 'Funcionário não encontrado');
        }
        catch (e) {
            console.log(e);
        }
    }
    async SearchByEmail(email) {
        try {
            const admLoginVerify = await this.adminLoginVerify.Verify();
            this.verifyResult.Result(null, admLoginVerify);
            const findEmployee = await prisma_1.prisma.employee.findUnique({
                where: {
                    email: email,
                },
            });
            return this.SearchResult(findEmployee, [], `Funcionario com email "${email}" nao encontrado`);
        }
        catch (e) {
            return console.log(e);
        }
    }
    async SearchByName(name) {
        try {
            const admLoginVerify = await this.adminLoginVerify.Verify();
            this.verifyResult.Result(null, admLoginVerify);
            const findEmployee = await prisma_1.prisma.employee.findMany({
                where: {
                    name: {
                        startsWith: name,
                    },
                },
            });
            return this.SearchResult(null, findEmployee, `Funcionarios com o nome "${name}" nao encontrados`);
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
exports.EmployeeSearch = EmployeeSearch;
