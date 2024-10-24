"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAdmin = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const prisma_1 = require("../../lib/prisma");
const DateTime_1 = require("../utils/DateTime");
const Logs_1 = require("../Logs/Logs");
dotenv_1.default.config();
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
                const logLogin = new Logs_1.Logs(admExists.email, (0, DateTime_1.DateTime)());
                await logLogin.CreateLogin();
                return console.log('Administrador logado com sucesso');
            }
        }
        catch (e) {
            return console.log('Erro ao logar como administrador');
        }
    }
    static async AdminLogout() {
        try {
            await prisma_1.prisma.adminLogin.deleteMany();
            return console.log('Administrador deslogado');
        }
        catch (e) {
            console.log('Erro ao realizar logout como administrador');
        }
    }
}
exports.UserAdmin = UserAdmin;
