"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminLoginVerify = void 0;
const prisma_1 = require("../../lib/prisma");
class AdminLoginVerify {
    async Verify() {
        try {
            const admLogin = await prisma_1.prisma.adminLogin.findMany();
            const adminData = [];
            if (admLogin.length <= 0)
                return false;
            admLogin.map((adm) => {
                adminData.push(adm.adminUser, adm.adminPassword);
            });
            const adminVerify = await prisma_1.prisma.employee.findUnique({
                where: {
                    email: adminData[0],
                    password: adminData[1],
                },
            });
            if (!adminVerify) {
                return console.log(`Erro ao validar login do administrador ${admLogin[0]}`);
            }
            if (adminVerify.email === adminData[0] &&
                adminVerify.password === adminData[1]) {
                return true;
            }
            return false;
        }
        catch (e) {
            return e;
        }
    }
}
exports.AdminLoginVerify = AdminLoginVerify;
