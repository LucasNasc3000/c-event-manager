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
        const adminVerify = await prisma_1.prisma.employee.findUnique({
            where: {
                email: 'adm@mail.com',
            },
        });
        const adminLoginVerify = await prisma_1.prisma.adminLogin.findUnique({
            where: {
                adminUser: 'adm@mail.com',
            },
        });
        if ((adminVerify === null || adminVerify === void 0 ? void 0 : adminVerify.email) !== 'adm@mail.com' ||
            (adminLoginVerify === null || adminLoginVerify === void 0 ? void 0 : adminLoginVerify.adminUser) !== 'adm@mail.com') {
            return console.log('O administrador nao esta logado ou nao existe');
        }
        if (adminVerify.email === (adminLoginVerify === null || adminLoginVerify === void 0 ? void 0 : adminLoginVerify.adminUser)) {
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
            return createEmployee;
        }
        catch (e) {
            console.log(e);
        }
    }
    // Colocar a verificação de login em um método
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
    async Update(id) {
        const findEmployee = await prisma_1.prisma.employee.findUnique({
            where: {
                id: id,
            },
        });
        if (!findEmployee) {
            return console.log(`Funcionario ${id} nao encontrado`);
        }
        const udpateEmployee = await prisma_1.prisma.employee.update({
            where: {
                id: id,
            },
            data: {
                email: this._email,
                name: this._name,
            },
        });
        return console.table(`Dados do funcionario ${id} atualizados: \n${udpateEmployee}`);
    }
    async Delete(id) {
        const deleteEmployee = await prisma_1.prisma.employee.delete({
            where: {
                id: id,
            },
        });
        return console.log(`Funcionario ${deleteEmployee.id} deletado`);
    }
}
exports.Employee = Employee;
