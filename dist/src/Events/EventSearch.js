"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSearch = void 0;
const prisma_1 = require("../../lib/prisma");
const AdminLoginVerify_1 = require("../LoginVerify/AdminLoginVerify");
const EmployeeLoginVerify_1 = require("../LoginVerify/EmployeeLoginVerify");
const VerifyResult_1 = require("../LoginVerify/VerifyResult");
class EventSearch {
    constructor() {
        this.adminLoginVerify = new AdminLoginVerify_1.AdminLoginVerify();
        this.employeeLoginVerify = new EmployeeLoginVerify_1.EmployeeLoginVerify();
        this.verifyResult = new VerifyResult_1.VerifyResult();
    }
    async SearchById(id, isSearch) {
        try {
            const employeeVerify = await this.employeeLoginVerify.Verify();
            const adminVerify = await this.adminLoginVerify.Verify();
            this.verifyResult.Result(employeeVerify, adminVerify);
            const findEvent = await prisma_1.prisma.event.findUnique({
                where: {
                    id: id,
                },
            });
            return this.SearchResult(findEvent, [], isSearch, `Evento ${id} não encontrado`);
        }
        catch (e) {
            return console.log(e);
        }
    }
    async SearchByEventCreator(eventCreatorParam) {
        try {
            const employeeVerify = await this.employeeLoginVerify.Verify();
            const adminVerify = await this.adminLoginVerify.Verify();
            this.verifyResult.Result(employeeVerify, adminVerify);
            const findEvent = await prisma_1.prisma.event.findMany({
                where: {
                    eventCreator: eventCreatorParam,
                },
            });
            return this.SearchResult(null, findEvent, true, `Eventos criados por: ${eventCreatorParam} nao encontrados`);
        }
        catch (e) {
            return console.log(e);
        }
    }
    async SearchByDate(dateParam) {
        try {
            const employeeVerify = await this.employeeLoginVerify.Verify();
            const adminVerify = await this.adminLoginVerify.Verify();
            this.verifyResult.Result(employeeVerify, adminVerify);
            const findEvent = await prisma_1.prisma.event.findMany({
                where: {
                    date: {
                        startsWith: dateParam,
                    },
                },
            });
            return this.SearchResult(null, findEvent, true, `Eventos do dia: ${dateParam} nao encontrado`);
        }
        catch (e) {
            return console.log(e);
        }
    }
    async SearchByHour(hourParam) {
        try {
            const employeeVerify = await this.employeeLoginVerify.Verify();
            const adminVerify = await this.adminLoginVerify.Verify();
            this.verifyResult.Result(employeeVerify, adminVerify);
            const findEvent = await prisma_1.prisma.event.findMany({
                where: {
                    hour: {
                        startsWith: hourParam,
                    },
                },
            });
            return this.SearchResult(null, findEvent, true, `Eventos da hora: ${hourParam} nao encontrados`);
        }
        catch (e) {
            return console.log(e);
        }
    }
    async SearchByName(nameParam) {
        try {
            const employeeVerify = await this.employeeLoginVerify.Verify();
            const adminVerify = await this.adminLoginVerify.Verify();
            this.verifyResult.Result(employeeVerify, adminVerify);
            const findEvent = await prisma_1.prisma.event.findMany({
                where: {
                    name: {
                        startsWith: nameParam,
                    },
                },
            });
            return this.SearchResult(null, findEvent, true, `Eventos de nome: ${nameParam} nao encontrados`);
        }
        catch (e) {
            return console.log(e);
        }
    }
    async SearchByHosts(hostsParam) {
        try {
            const employeeVerify = await this.employeeLoginVerify.Verify();
            const adminVerify = await this.adminLoginVerify.Verify();
            this.verifyResult.Result(employeeVerify, adminVerify);
            const findEvent = await prisma_1.prisma.event.findMany({
                where: {
                    hosts: {
                        startsWith: hostsParam,
                    },
                },
            });
            return this.SearchResult(null, findEvent, true, `Eventos com os anfitrioes: ${hostsParam} nao encontrados`);
        }
        catch (e) {
            return console.log(e);
        }
    }
    async SearchByLocation(locationParam) {
        try {
            const employeeVerify = await this.employeeLoginVerify.Verify();
            const adminVerify = await this.adminLoginVerify.Verify();
            this.verifyResult.Result(employeeVerify, adminVerify);
            const findEvent = await prisma_1.prisma.event.findMany({
                where: {
                    location: locationParam,
                },
            });
            return this.SearchResult(null, findEvent, true, `Eventos no local: ${locationParam} nao encontrados`);
        }
        catch (e) {
            return console.log(e);
        }
    }
    async SearchByPlattform(plattformParam) {
        try {
            const employeeVerify = await this.employeeLoginVerify.Verify();
            const adminVerify = await this.adminLoginVerify.Verify();
            this.verifyResult.Result(employeeVerify, adminVerify);
            const findEvent = await prisma_1.prisma.event.findMany({
                where: {
                    plattform: plattformParam,
                },
            });
            return this.SearchResult(null, findEvent, true, `Eventos na plataforma ${plattformParam} nao encontrados`);
        }
        catch (e) {
            return console.log(e);
        }
    }
    async SearchByEventCreatorId(eventCreatorIdParam) {
        try {
            const employeeVerify = await this.employeeLoginVerify.Verify();
            const adminVerify = await this.adminLoginVerify.Verify();
            this.verifyResult.Result(employeeVerify, adminVerify);
            const findEvent = await prisma_1.prisma.event.findMany({
                where: {
                    eventCreatorId: eventCreatorIdParam,
                },
            });
            return this.SearchResult(null, findEvent, true, `Eventos criados pelo funcionário: ${eventCreatorIdParam} nao encontrados`);
        }
        catch (e) {
            return console.log(e);
        }
    }
    SearchResult(searchData, searchDataArray, isSearch, error) {
        switch (true) {
            case isSearch === true &&
                searchData === null &&
                searchDataArray.length < 1:
                return console.log(error);
            case isSearch === true &&
                searchData === null &&
                searchDataArray.length > 0:
                return console.table(searchDataArray);
            case isSearch === true &&
                searchDataArray.length < 1 &&
                searchData !== null:
                return console.table(searchData);
            case isSearch === false &&
                searchDataArray.length > 0 &&
                searchData === null:
                return searchDataArray;
            case isSearch === false &&
                searchData !== null &&
                searchDataArray.length < 1:
                return searchData;
            case isSearch === false &&
                searchData === null &&
                searchDataArray.length < 1:
                throw new Error('Evento não encontrado');
        }
    }
}
exports.EventSearch = EventSearch;
