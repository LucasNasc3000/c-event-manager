"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const prisma_1 = require("../lib/prisma");
dotenv_1.default.config();
class Employee {
    constructor(name = '', email = '', password = '') {
        this._name = '';
        this._email = '';
        this._password = '';
        this.errorMsg = 'Operacao nao autorizada. Login do administrador necessario';
        this._name = name;
        this._email = email;
        this._password = password;
    }
    async adminLoginVerify() {
        const admLogin = await prisma_1.prisma.adminLogin.findMany();
        if (admLogin.length <= 0)
            return false;
        const verifyAdminUser = admLogin.map((adm) => {
            return adm.adminUser;
        });
        const adminVerify = await prisma_1.prisma.employee.findUnique({
            where: {
                email: verifyAdminUser[0],
            },
        });
        if (adminVerify !== null && adminVerify.email === verifyAdminUser[0]) {
            return true;
        }
        return false;
    }
    async Create() {
        try {
            const admLoginVerify = await this.adminLoginVerify();
            if (admLoginVerify === false) {
                return console.log(this.errorMsg);
            }
            const createEmployee = await prisma_1.prisma.employee.create({
                data: {
                    name: this._name,
                    email: this._email,
                    password: this._password,
                },
            });
            return console.table(createEmployee);
        }
        catch (e) {
            console.log(e);
        }
    }
    async EmployeeList() {
        try {
            const admLoginVerify = await this.adminLoginVerify();
            if (admLoginVerify === false) {
                return console.log(this.errorMsg);
            }
            const employeesList = await prisma_1.prisma.employee.findMany();
            return console.table(employeesList);
        }
        catch (e) {
            console.log(e);
        }
    }
    async Update(id, data) {
        const admLoginVerify = await this.adminLoginVerify();
        if (admLoginVerify === false) {
            return console.log(this.errorMsg);
        }
        const findEmployee = await prisma_1.prisma.employee.findUnique({
            where: {
                id: id,
            },
        });
        if (!findEmployee) {
            return console.log(`Funcionario ${id} nao encontrado`);
        }
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        const udpateEmployee = await prisma_1.prisma.employee.update({
            where: {
                id: id,
            },
            data: {
                email: data[0],
                name: data[1],
            },
        });
        const updateCheck = await this.searchById(id);
        return updateCheck;
    }
    async Delete(id) {
        const deleteEmployee = await prisma_1.prisma.employee.delete({
            where: {
                id: id,
            },
        });
        return console.log(`Funcionario ${deleteEmployee.id} deletado`);
    }
    async searchById(id) {
        const admLoginVerify = await this.adminLoginVerify();
        if (admLoginVerify === false) {
            return console.log(this.errorMsg);
        }
        const findEmployee = await prisma_1.prisma.employee.findUnique({
            where: {
                id: id,
            },
        });
        if (!findEmployee) {
            return null;
        }
        return console.table(findEmployee);
    }
    async searchByEmail(email) {
        const admLoginVerify = await this.adminLoginVerify();
        if (admLoginVerify === false) {
            return console.log(this.errorMsg);
        }
        const findEmployee = await prisma_1.prisma.employee.findUnique({
            where: {
                email: email,
            },
        });
        if (!findEmployee) {
            return console.log(`Funcionario ${email} nao encontrado`);
        }
        return console.table(findEmployee);
    }
    async searchByName(name) {
        const admLoginVerify = await this.adminLoginVerify();
        if (admLoginVerify === false) {
            return console.log(this.errorMsg);
        }
        const findEmployee = await prisma_1.prisma.employee.findUnique({
            where: {
                name: name,
            },
        });
        if (!findEmployee) {
            return console.log(`Funcionario ${name} nao encontrado`);
        }
        return console.table(findEmployee);
    }
}
exports.Employee = Employee;
