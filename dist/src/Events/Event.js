"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
/* eslint-disable no-unused-vars */
const prisma_1 = require("../../lib/prisma");
class Event {
    constructor(eventCreator = '', date = '', hour = '', name = '', hosts = '', modality = '', location = '', plattform = '', eventCreatorId = '') {
        this.eventCreator = eventCreator;
        this.date = date;
        this.hour = hour;
        this.name = name;
        this.hosts = hosts;
        this.modality = modality;
        this.location = location;
        this.plattform = plattform;
        this.eventCreatorId = eventCreatorId;
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
    async Create() {
        try {
            const employeeVerify = await this.EmployeeLoginVerify();
            if (employeeVerify === false) {
                return console.log('Operação não autorizada, login de funcionário necessário');
            }
            if (!employeeVerify)
                return console.log('Erro desconhecido');
            const event = await prisma_1.prisma.event.create({
                data: {
                    eventCreator: this.eventCreator,
                    date: this.date,
                    hour: this.hour,
                    name: this.name,
                    hosts: this.hosts,
                    modality: this.modality,
                    location: this.location,
                    plattform: this.plattform,
                    eventCreatorId: this.eventCreatorId,
                },
            });
            return console.table(event);
        }
        catch (e) {
            return console.log(e);
        }
    }
    async List() {
        try {
            const employeeVerify = await this.EmployeeLoginVerify();
            if (employeeVerify === false) {
                return console.log('Operação não autorizada, login de funcionário necessário');
            }
            if (!employeeVerify)
                return console.log('Erro desconhecido');
            const eventsList = await prisma_1.prisma.event.findMany();
            if (eventsList.length < 1) {
                return console.log('Ocorreu um erro ou não há eventos cadastrados');
            }
            return console.table(eventsList);
        }
        catch (e) {
            return console.log(e);
        }
    }
}
exports.Event = Event;
