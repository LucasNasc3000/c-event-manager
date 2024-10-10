"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSearch = void 0;
const prisma_1 = require("../../lib/prisma");
class EventSearch {
    constructor() {
        this.errorMsg = 'Operação não autorizada, login de funcionário necessário';
    }
    async EmployeeLoginVerify() {
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
    async SearchById(id) {
        try {
            const employeeVerify = await this.EmployeeLoginVerify();
            if (employeeVerify === false)
                return console.log(this.errorMsg);
            if (!employeeVerify)
                return console.log('Erro desconhecido');
            const findEvent = await prisma_1.prisma.event.findUnique({
                where: {
                    id: id,
                },
            });
            if (!findEvent)
                return console.log(`Evento ${id} nao encontrado`);
            return console.table(findEvent);
        }
        catch (e) {
            console.log(e);
        }
    }
    async SearchByEventCreator(eventCreatorParam) {
        try {
            const employeeVerify = await this.EmployeeLoginVerify();
            if (employeeVerify === false)
                return console.log(this.errorMsg);
            if (!employeeVerify)
                return console.log('Erro desconhecido');
            const findEvent = await prisma_1.prisma.event.findMany({
                where: {
                    eventCreator: eventCreatorParam,
                },
            });
            if (!findEvent) {
                return console.log(`Eventos criados por: ${eventCreatorParam} nao encontrados`);
            }
            return console.table(findEvent);
        }
        catch (e) {
            console.log(e);
        }
    }
    async SearchByDate(dateParam) {
        try {
            const employeeVerify = await this.EmployeeLoginVerify();
            if (employeeVerify === false)
                return console.log(this.errorMsg);
            if (!employeeVerify)
                return console.log('Erro desconhecido');
            const findEvent = await prisma_1.prisma.event.findMany({
                where: {
                    date: dateParam,
                },
            });
            if (!findEvent) {
                return console.log(`Eventos do dia: ${dateParam} nao encontrado`);
            }
            return console.table(findEvent);
        }
        catch (e) {
            console.log(e);
        }
    }
    async SearchByHour(hourParam) {
        try {
            const employeeVerify = await this.EmployeeLoginVerify();
            if (employeeVerify === false)
                return console.log(this.errorMsg);
            if (!employeeVerify)
                return console.log('Erro desconhecido');
            const findEvent = await prisma_1.prisma.event.findMany({
                where: {
                    hour: hourParam,
                },
            });
            if (!findEvent) {
                return console.log(`Eventos da hora: ${hourParam} nao encontrados`);
            }
            return console.table(findEvent);
        }
        catch (e) {
            console.log(e);
        }
    }
    async SearchByName(nameParam) {
        try {
            const employeeVerify = await this.EmployeeLoginVerify();
            if (employeeVerify === false)
                return console.log(this.errorMsg);
            if (!employeeVerify)
                return console.log('Erro desconhecido');
            const findEvent = await prisma_1.prisma.event.findUnique({
                where: {
                    name: nameParam,
                },
            });
            if (!findEvent) {
                return console.log(`Evento: ${nameParam} nao encontrado`);
            }
            return console.table(findEvent);
        }
        catch (e) {
            console.log(e);
        }
    }
    async SearchByHosts(hostsParam) {
        try {
            const employeeVerify = await this.EmployeeLoginVerify();
            if (employeeVerify === false)
                return console.log(this.errorMsg);
            if (!employeeVerify)
                return console.log('Erro desconhecido');
            const findEvent = await prisma_1.prisma.event.findMany({
                where: {
                    hosts: hostsParam,
                },
            });
            if (!findEvent) {
                return console.log(`Eventos com os anfitrioes: ${hostsParam} nao encontrados`);
            }
            return console.table(findEvent);
        }
        catch (e) {
            console.log(e);
        }
    }
    async SearchByLocation(locationParam) {
        try {
            const employeeVerify = await this.EmployeeLoginVerify();
            if (employeeVerify === false)
                return console.log(this.errorMsg);
            if (!employeeVerify)
                return console.log('Erro desconhecido');
            const findEvent = await prisma_1.prisma.event.findMany({
                where: {
                    location: locationParam,
                },
            });
            if (!findEvent) {
                return console.log(`Eventos no local: ${locationParam} nao encontrados`);
            }
            return console.table(findEvent);
        }
        catch (e) {
            console.log(e);
        }
    }
    async SearchByPlattform(plattformParam) {
        try {
            const employeeVerify = await this.EmployeeLoginVerify();
            if (employeeVerify === false)
                return console.log(this.errorMsg);
            if (!employeeVerify)
                return console.log('Erro desconhecido');
            const findEvent = await prisma_1.prisma.event.findMany({
                where: {
                    plattform: plattformParam,
                },
            });
            if (!findEvent) {
                return console.log(`Eventos na plataforma: ${plattformParam} nao encontrados`);
            }
            return console.table(findEvent);
        }
        catch (e) {
            console.log(e);
        }
    }
    async SearchByEventCreatorId(eventCreatorIdParam) {
        try {
            const employeeVerify = await this.EmployeeLoginVerify();
            if (employeeVerify === false)
                return console.log(this.errorMsg);
            if (!employeeVerify)
                return console.log('Erro desconhecido');
            const findEvent = await prisma_1.prisma.event.findMany({
                where: {
                    eventCreatorId: eventCreatorIdParam,
                },
            });
            if (!findEvent) {
                return console.log(`Eventos criados pelo funcionário: ${eventCreatorIdParam} nao encontrados`);
            }
            return console.table(findEvent);
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.EventSearch = EventSearch;
