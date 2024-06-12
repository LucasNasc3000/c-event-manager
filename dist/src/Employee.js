"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const prisma_1 = require("../lib/prisma");
class Employee {
    constructor(name, email, password) {
        this._name = name;
        this._email = email;
        this._password = password;
    }
    get name() {
        return this._name;
    }
    get email() {
        return this._email;
    }
    set name(name) {
        this._name = name;
    }
    set email(email) {
        this._email = email;
    }
    async adminLoginVerify() {
        const adminVerify = await prisma_1.prisma.employee.findUnique({
            where: {
                name: 'adm@30001',
            },
        });
        if (adminVerify === null) {
            return false;
        }
        const adminLoginVerify = await prisma_1.prisma.adminLogin.findUnique({
            where: {
                adminUser: 'adm@30001',
            },
        });
        if (adminVerify.name === (adminLoginVerify === null || adminLoginVerify === void 0 ? void 0 : adminLoginVerify.adminUser)) {
            return true;
        }
    }
    async Create() {
        try {
            const admLoginVerify = await this.adminLoginVerify();
            if (admLoginVerify === false) {
                return console.log('Operacao nao autorizada. Login do administrador necessario');
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
    async EmployeeList() {
        try {
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
