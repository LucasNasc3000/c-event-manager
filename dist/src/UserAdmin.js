"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAdmin = void 0;
const prisma_1 = require("../lib/prisma");
class UserAdmin {
    constructor(adminUsername, adminPassword) {
        this.adminUsername = adminUsername;
        this.adminPassword = adminPassword;
    }
    async findAdmin() {
        const admExists = await prisma_1.prisma.employee.findUnique({
            where: {
                email: this.adminUsername,
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
                    email: this.adminUsername,
                    password: this.adminPassword,
                },
            });
            return createAdmin;
        }
        return 'Admin já existente';
    }
    static async CreateAdmin(adminUsername, adminPassword) {
        try {
            const admin = new UserAdmin(adminUsername, adminPassword);
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
    static async adminLogin(adminUsername, adminPassword) {
        const admin = new UserAdmin(adminUsername, adminPassword);
        const admExists = await admin.findAdmin();
        if (admExists !== null) {
            const verify = await admin.adminVerify();
            if (verify === false) {
                return console.log('Usuario ou senha invalidos');
            }
            await prisma_1.prisma.adminLogin.create({
                data: {
                    adminUser: admin.adminUsername,
                    adminPassword: admin.adminPassword,
                },
            });
        }
        else {
            return console.log('O usuario administrador ainda nao foi criado');
        }
    }
    static async adminLogout(adminUsername, adminPassword) {
        const admin = new UserAdmin(adminUsername, adminPassword);
        const admExists = await admin.findAdmin();
        if (admExists !== null) {
            const loggedAdmin = await prisma_1.prisma.adminLogin.count({
                where: {
                    id: admExists.id,
                },
            });
            if (loggedAdmin > 0) {
                await prisma_1.prisma.adminLogin.delete({
                    where: {
                        id: admExists.id,
                    },
                });
            }
        }
        else {
            return console.log('O administrador nao foi cadastrado');
        }
    }
    async adminVerify() {
        const admExists = await this.findAdmin();
        // temporario
        if ((admExists === null || admExists === void 0 ? void 0 : admExists.email) === 'adm@mail.com' &&
            (admExists === null || admExists === void 0 ? void 0 : admExists.password) === 'Dont_Forget_A_Senha!_') {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.UserAdmin = UserAdmin;
