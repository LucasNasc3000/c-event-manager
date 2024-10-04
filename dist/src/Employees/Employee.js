"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const prisma_1 = require("../../lib/prisma");
const DateTime_1 = require("../utils/DateTime");
const Logs_1 = require("../Logs/Logs");
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
    async AdminLoginVerify() {
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
            const admLoginVerify = await this.AdminLoginVerify();
            if (admLoginVerify === false)
                return console.log(this.errorMsg);
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
    async List() {
        try {
            const admLoginVerify = await this.AdminLoginVerify();
            if (admLoginVerify === false)
                return console.log(this.errorMsg);
            const employeesList = await prisma_1.prisma.employee.findMany();
            if (employeesList.length < 1) {
                return console.log('Ocorreu um erro ou não há funcionários cadastrados');
            }
            return console.table(employeesList);
        }
        catch (e) {
            console.log(e);
        }
    }
    async Update(id, data) {
        try {
            const admLoginVerify = await this.AdminLoginVerify();
            if (admLoginVerify === false)
                return console.log(this.errorMsg);
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
            const updateCheck = await this.SearchById(id);
            return updateCheck;
        }
        catch (e) {
            return console.log(e);
        }
    }
    async Delete(id) {
        try {
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
            if (!findEmployee) {
                return console.log('Funcionário não encontrado');
            }
            return console.table(findEmployee);
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
            if (!findEmployee) {
                return console.log(`Funcionario com email "${email}" nao encontrado`);
            }
            return console.table(findEmployee);
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
            if (findEmployee.length < 1) {
                return console.log(`Funcionarios com o nome "${name}" nao encontrados`);
            }
            return console.table(findEmployee);
        }
        catch (e) {
            return console.log(e);
        }
    }
    async Login() {
        try {
            const admLoginVerify = await this.AdminLoginVerify();
            if (admLoginVerify === true) {
                return console.log('Login nao autorizado enquanto o administrador estiver logado');
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
            const logLogin = new Logs_1.Logs(this._email, (0, DateTime_1.DateTime)());
            await logLogin.CreateLogin();
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
            const logLogout = new Logs_1.Logs(this._email, (0, DateTime_1.DateTime)());
            await logLogout.CreateLogout();
            return console.log(`Funcionario ${this._email} deslogado.`);
        }
        catch (e) {
            return console.log(e);
        }
    }
}
exports.Employee = Employee;
