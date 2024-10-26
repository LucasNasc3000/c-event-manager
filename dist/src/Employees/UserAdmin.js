"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAdmin = void 0;
const prisma_1 = require("../../lib/prisma");
const DateTime_1 = require("../utils/DateTime");
const LogFactory_1 = require("../Logs/LogFactory");
class UserAdmin {
    constructor(adminEmail, adminPassword) {
        this.adminEmail = adminEmail;
        this.adminPassword = adminPassword;
    }
    async FindAdmin() {
        try {
            const admExists = await prisma_1.prisma.employee.findUnique({
                where: {
                    email: this.adminEmail,
                },
            });
            if (admExists === null) {
                return console.log('Administrador não encontrado');
            }
            return admExists;
        }
        catch (e) {
            return console.log('Erro ao buscar administrador');
        }
    }
    async IsLogged() {
        try {
            const admExists = await prisma_1.prisma.adminLogin.findUnique({
                where: {
                    adminUser: this.adminEmail,
                },
            });
            if (admExists === null)
                return null;
            return admExists;
        }
        catch (e) {
            return console.log('Erro ao verificar se o administrador já está logado');
        }
    }
    async Create() {
        try {
            const admExists = await this.FindAdmin();
            if (admExists === null) {
                await prisma_1.prisma.employee.create({
                    data: {
                        name: 'adm@30001',
                        email: this.adminEmail,
                        password: this.adminPassword,
                    },
                });
            }
            return console.log('Administrador ja cadastrado');
        }
        catch (e) {
            return console.log('Erro ao criar administrador');
        }
    }
    static async CreateAdmin(adminEmail, adminPassword) {
        try {
            const admin = new UserAdmin(adminEmail, adminPassword);
            const admExists = await admin.FindAdmin();
            if (admExists)
                return admExists.email;
            await admin.Create();
            return 'Administrador criado';
        }
        catch (e) {
            return console.log('Erro ao criar novo administrador');
        }
    }
    static async AdminLogin(adminEmail, adminPassword) {
        try {
            const admin = new UserAdmin(adminEmail, adminPassword);
            const admExists = await admin.FindAdmin();
            const isLogged = await admin.IsLogged();
            if (admExists) {
                if (isLogged !== null) {
                    return console.log('Administrador com login ja ativo');
                }
                if (admExists.password !== adminPassword) {
                    return console.log('Senha incorreta');
                }
                await prisma_1.prisma.adminLogin.create({
                    data: {
                        adminUser: admExists.email,
                        adminPassword: admExists.password,
                    },
                });
                const logLogin = new LogFactory_1.LogFactory(true, '', '', (0, DateTime_1.DateTime)(), admExists.email);
                await logLogin.Create();
                return console.log('Administrador logado com sucesso');
            }
        }
        catch (e) {
            return console.log('Erro ao logar como administrador');
        }
    }
    static async AdminLogout() {
        try {
            const adminData = await prisma_1.prisma.adminLogin.findMany();
            const adminEmail = [];
            adminData.map((data) => {
                adminEmail.push(data.adminUser);
            });
            await prisma_1.prisma.adminLogin.deleteMany();
            const logLogout = new LogFactory_1.LogFactory(false, '', '', (0, DateTime_1.DateTime)(), adminEmail[0]);
            await logLogout.Create();
            return console.log('Administrador deslogado');
        }
        catch (e) {
            console.log('Erro ao realizar logout como administrador');
        }
    }
}
exports.UserAdmin = UserAdmin;
