"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
/* eslint-disable no-unused-vars */
const prisma_1 = require("../../lib/prisma");
class Event {
    constructor(eventCreator = '', date = '', hour = '', name = '', hosts = '', modality = '', location = '', plattform = '', eventCreatorId = '', errorMsg = 'Operação não autorizada, login de funcionário necessário') {
        this.eventCreator = eventCreator;
        this.date = date;
        this.hour = hour;
        this.name = name;
        this.hosts = hosts;
        this.modality = modality;
        this.location = location;
        this.plattform = plattform;
        this.eventCreatorId = eventCreatorId;
        this.errorMsg = errorMsg;
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
            if (employeeVerify === false)
                return console.log(this.errorMsg);
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
            if (employeeVerify === false)
                return console.log(this.errorMsg);
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
    async Update(id, data) {
        try {
            const employeeVerify = await this.EmployeeLoginVerify();
            if (employeeVerify === false)
                return console.log(this.errorMsg);
            const findEvent = await prisma_1.prisma.event.findUnique({
                where: {
                    id: id,
                },
            });
            if (!findEvent)
                return console.log(`Evento ${id} nao encontrado`);
            await prisma_1.prisma.event.update({
                where: {
                    id: id,
                },
                data: {
                    eventCreator: data[0],
                    date: data[1],
                    hour: data[2],
                    name: data[3],
                    hosts: data[4],
                    modality: data[5],
                    location: data[6],
                    plattform: data[7],
                },
            });
            const updateCheck = await this.SearchById(id);
            return updateCheck;
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
}
exports.Event = Event;
