"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeSearch = void 0;
const prisma_1 = require("../../lib/prisma");
class EmployeeSearch {
    constructor() {
        this.errorMsg = 'Operacao nao autorizada. Login do administrador necessario';
    }
    async AdminLoginVerify() {
        try {
            const admLogin = await prisma_1.prisma.adminLogin.findMany();
            const adminData = [];
            if (admLogin.length <= 0)
                return false;
            admLogin.map((adm) => {
                adminData.push(adm.adminUser, adm.adminPassword);
            });
            const adminVerify = await prisma_1.prisma.employee.findUnique({
                where: {
                    email: adminData[0],
                    password: adminData[1],
                },
            });
            if (!adminVerify) {
                return console.log(`Erro ao validar login do administrador ${admLogin[0]}`);
            }
            if (adminVerify.email === adminData[0] &&
                adminVerify.password === adminData[1]) {
                return true;
            }
            return false;
        }
        catch (e) {
            return console.log(e);
        }
    }
    async SearchById(id) {
        try {
            const admLoginVerify = await this.AdminLoginVerify();
            if (admLoginVerify === false)
                return console.log(this.errorMsg);
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
            const admLoginVerify = await this.AdminLoginVerify();
            if (admLoginVerify === false)
                return console.log(this.errorMsg);
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
            const admLoginVerify = await this.AdminLoginVerify();
            if (admLoginVerify === false)
                return console.log(this.errorMsg);
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
