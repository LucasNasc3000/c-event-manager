"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAdmin = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const prisma_1 = require("../lib/prisma");
dotenv_1.default.config();
class UserAdmin {
    constructor(adminEmail, adminPassword) {
        this.adminEmail = adminEmail;
        this.adminPassword = adminPassword;
    }
    async findAdmin() {
        const admExists = await prisma_1.prisma.employee.findUnique({
            where: {
                email: this.adminEmail,
                password: this.adminPassword,
            },
        });
        if (admExists === null) {
            return null;
        }
        return admExists;
    }
    async Create() {
        const admExists = await this.findAdmin();
        if (admExists === null) {
            const createAdmin = await prisma_1.prisma.employee.create({
                data: {
                    name: 'adm@30001',
                    email: this.adminEmail,
                    password: this.adminPassword,
                },
            });
            return createAdmin;
        }
        return 'Admin já existente';
    }
    static async CreateAdmin(adminEmail, adminPassword) {
        try {
            const admin = new UserAdmin(adminEmail, adminPassword);
            const admExists = await admin.findAdmin();
            if (admExists !== null) {
                return admExists.email;
            }
            await admin.Create();
            return 'Administrador criado';
        }
        catch (e) {
            console.log(e);
        }
    }
    static async adminLogin(adminEmail, adminPassword) {
        try {
            const admin = new UserAdmin(adminEmail, adminPassword);
            const admExists = await admin.findAdmin();
            if (admExists !== null) {
                await prisma_1.prisma.adminLogin.create({
                    data: {
                        adminUser: admExists.email,
                        adminPassword: admExists.password,
                    },
                });
                return console.log('Administrador logado com sucesso');
            }
            else {
                return 'Usuario ou senha incorretos';
            }
        }
        catch (e) {
            return console.log(e);
        }
    }
    static async adminLogout() {
        try {
            await prisma_1.prisma.adminLogin.deleteMany();
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.UserAdmin = UserAdmin;
