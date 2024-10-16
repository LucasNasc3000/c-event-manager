"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeLoginVerify = void 0;
const prisma_1 = require("../../lib/prisma");
class EmployeeLoginVerify {
    async Verify() {
        try {
            const employeeLogin = await prisma_1.prisma.userLogin.findMany();
            const empData = [];
            if (employeeLogin.length <= 0)
                return false;
            employeeLogin.map((employee) => {
                empData.push(employee.userEmail, employee.userPassword);
            });
            const employeeLoginVerify = await prisma_1.prisma.employee.findUnique({
                where: {
                    email: empData[0],
                    password: empData[1],
                },
            });
            if (!employeeLoginVerify) {
                return console.log(`Erro ao validar login do funcionário: ${empData[0]}`);
            }
            if (employeeLoginVerify.email === empData[0] &&
                employeeLoginVerify.password === empData[1]) {
                return true;
            }
            return false;
        }
        catch (e) {
            return console.log(e);
        }
    }
}
exports.EmployeeLoginVerify = EmployeeLoginVerify;
