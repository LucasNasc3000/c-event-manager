"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const prisma_1 = require("../../lib/prisma");
const DateTime_1 = require("../utils/DateTime");
const LogFactory_1 = require("../Logs/LogFactory");
const EmployeeSearchFilter_1 = require("./EmployeeSearchFilter");
const EmployeeSearch_1 = require("./EmployeeSearch");
const EmployeeLoginVerify_1 = require("../LoginVerify/EmployeeLoginVerify");
const AdminLoginVerify_1 = require("../LoginVerify/AdminLoginVerify");
const VerifyResult_1 = require("../LoginVerify/VerifyResult");
class Employee {
    constructor(_name = '', _email = '', _password = '', _adminLoginVerify, _verifyResult) {
        this._name = _name;
        this._email = _email;
        this._password = _password;
        this._adminLoginVerify = _adminLoginVerify;
        this._verifyResult = _verifyResult;
    }
    Verify() {
        throw new Error('Method not implemented.');
    }
    async Create() {
        try {
            const admLoginVerify = await this._adminLoginVerify.Verify();
            this._verifyResult.Result(null, admLoginVerify);
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
            const admLoginVerify = await this._adminLoginVerify.Verify();
            this._verifyResult.Result(null, admLoginVerify);
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
            const admLoginVerify = await this._adminLoginVerify.Verify();
            this._verifyResult.Result(null, admLoginVerify);
            const admVerify = new AdminLoginVerify_1.AdminLoginVerify();
            const admVerifyResult = new VerifyResult_1.VerifyResult();
            const employeeNewData = new EmployeeSearch_1.EmployeeSearch(admVerify, admVerifyResult);
            await employeeNewData.SearchById(id, false);
            await prisma_1.prisma.employee.update({
                where: {
                    id: id,
                },
                data: {
                    email: data[0],
                    name: data[1],
                },
            });
            const showEmployeeNewData = new EmployeeSearch_1.EmployeeSearch(admVerify, admVerifyResult);
            const employeeSearchFilter = new EmployeeSearchFilter_1.EmployeeSearchFilter('id', id, showEmployeeNewData);
            employeeSearchFilter.Filter();
        }
        catch (e) {
            return console.log(e);
        }
    }
    async Delete(id) {
        try {
            const admLoginVerify = await this._adminLoginVerify.Verify();
            this._verifyResult.Result(null, admLoginVerify);
            const admVerify = new AdminLoginVerify_1.AdminLoginVerify();
            const admVerifyResult = new VerifyResult_1.VerifyResult();
            const employeeSearch = new EmployeeSearch_1.EmployeeSearch(admVerify, admVerifyResult);
            await employeeSearch.SearchById(id, false);
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
            const admLoginVerify = await this._adminLoginVerify.Verify();
            const employeeLoginVerify = new EmployeeLoginVerify_1.EmployeeLoginVerify();
            await employeeLoginVerify.Verify();
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
            console.log(employeeVerify);
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
