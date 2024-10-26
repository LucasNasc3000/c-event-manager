"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const prisma_1 = require("../../lib/prisma");
const DateTime_1 = require("../utils/DateTime");
const LogFactory_1 = require("../Logs/LogFactory");
const EmployeeSearch_1 = require("./EmployeeSearch");
const AdminLoginVerify_1 = require("../LoginVerify/AdminLoginVerify");
const VerifyResult_1 = require("../LoginVerify/VerifyResult");
const EmployeeLoginVerify_1 = require("../LoginVerify/EmployeeLoginVerify");
class Employee {
    constructor(name = '', email = '', password = '') {
        this._name = '';
        this._email = '';
        this._password = '';
        this.employeeSearch = new EmployeeSearch_1.EmployeeSearch();
        this.adminLoginVerify = new AdminLoginVerify_1.AdminLoginVerify();
        this.verifyResult = new VerifyResult_1.VerifyResult();
        this.employeeLoginVerify = new EmployeeLoginVerify_1.EmployeeLoginVerify();
        this._name = name;
        this._email = email;
        this._password = password;
    }
    async Create() {
        try {
            const admLoginVerify = await this.adminLoginVerify.Verify();
            this.verifyResult.Result(null, admLoginVerify);
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
            return console.log(e);
        }
    }
    async List() {
        try {
            const admLoginVerify = await this.adminLoginVerify.Verify();
            this.verifyResult.Result(null, admLoginVerify);
            const employeesList = await prisma_1.prisma.employee.findMany();
            if (employeesList.length < 1) {
                return console.log('Ocorreu um erro ou não há funcionários cadastrados');
            }
            return console.table(employeesList);
        }
        catch (e) {
            return console.log(e);
        }
    }
    async Update(id, data) {
        try {
            const admLoginVerify = await this.adminLoginVerify.Verify();
            this.verifyResult.Result(null, admLoginVerify);
            await this.employeeSearch.SearchById(id, false);
            await prisma_1.prisma.employee.update({
                where: {
                    id: id,
                },
                data: {
                    email: data[0],
                    name: data[1],
                },
            });
            await this.employeeSearch.SearchById(id, true);
        }
        catch (e) {
            return console.log(e);
        }
    }
    async Delete(id) {
        try {
            const admLoginVerify = await this.adminLoginVerify.Verify();
            this.verifyResult.Result(null, admLoginVerify);
            const deleteEmployee = await prisma_1.prisma.employee.delete({
                where: {
                    id: id,
                },
            });
            return console.log(`Funcionario ${deleteEmployee.id} deletado`);
        }
        catch (e) {
            return console.log(e);
        }
    }
    async Login() {
        try {
            const admLoginVerify = await this.adminLoginVerify.Verify();
            const employeeLoginVerify = await this.employeeLoginVerify.Verify();
            if (admLoginVerify === true) {
                return console.log('Login nao autorizado enquanto o administrador estiver logado');
            }
            if (typeof employeeLoginVerify === 'string') {
                return console.log(`Erro: o funcionário ${employeeLoginVerify} já está logado`);
            }
            const employeeVerify = await prisma_1.prisma.employee.findUnique({
                where: {
                    email: this._email,
                },
            });
            if (!employeeVerify)
                return console.log('Funcionario não registrado');
            if ((employeeVerify === null || employeeVerify === void 0 ? void 0 : employeeVerify.password) !== this._password) {
                return console.log('Senha incorreta');
            }
            await prisma_1.prisma.userLogin.create({
                data: {
                    userEmail: this._email,
                    userPassword: this._password,
                },
            });
            const logLogin = new LogFactory_1.LogFactory(true, '', '', (0, DateTime_1.DateTime)(), this._email);
            await logLogin.Create();
            return console.log(`Funcionario ${this._email} logado com sucesso.`);
        }
        catch (e) {
            return console.log(e);
        }
    }
    async Logout() {
        try {
            await prisma_1.prisma.userLogin.delete({
                where: {
                    userEmail: this._email,
                },
            });
            const logLogout = new LogFactory_1.LogFactory(false, '', '', (0, DateTime_1.DateTime)(), this._email);
            await logLogout.Create();
            return console.log(`Funcionario ${this._email} deslogado.`);
        }
        catch (e) {
            return console.log(e);
        }
    }
}
exports.Employee = Employee;
