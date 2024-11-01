"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
/* eslint-disable no-unused-vars */
const prisma_1 = require("../../lib/prisma");
const EventSearch_1 = require("./EventSearch");
const VerifyResult_1 = require("../LoginVerify/VerifyResult");
const EmployeeLoginVerify_1 = require("../LoginVerify/EmployeeLoginVerify");
const AdminLoginVerify_1 = require("../LoginVerify/AdminLoginVerify");
const EventSearchFilter_1 = require("./EventSearchFilter");
class Event {
    constructor(_adminLoginVerify, _employeeLoginVerify, _verifyResult) {
        this._adminLoginVerify = _adminLoginVerify;
        this._employeeLoginVerify = _employeeLoginVerify;
        this._verifyResult = _verifyResult;
    }
    Verify() {
        throw new Error('Method not implemented.');
    }
    async Create(data) {
        try {
            const employeeVerify = await this._employeeLoginVerify.Verify();
            const adminVerify = await this._adminLoginVerify.Verify();
            this._verifyResult.Result(employeeVerify, adminVerify);
            const event = await prisma_1.prisma.event.create({
                data: {
                    eventCreator: data[0],
                    date: data[1],
                    hour: data[2],
                    name: data[3],
                    hosts: data[4],
                    modality: data[5],
                    location: data[6],
                    plattform: data[7],
                    eventCreatorId: data[8],
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
            const employeeVerify = await this._employeeLoginVerify.Verify();
            const adminVerify = await this._adminLoginVerify.Verify();
            this._verifyResult.Result(employeeVerify, adminVerify);
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
            const localEmployeeVerify = await this._employeeLoginVerify.Verify();
            const localAdminVerify = await this._adminLoginVerify.Verify();
            this._verifyResult.Result(localEmployeeVerify, localAdminVerify);
            const employeeVerify = new EmployeeLoginVerify_1.EmployeeLoginVerify();
            const adminVerify = new AdminLoginVerify_1.AdminLoginVerify();
            const verifyResult = new VerifyResult_1.VerifyResult();
            const eventSearch = new EventSearch_1.EventSearch(adminVerify, employeeVerify, verifyResult);
            await eventSearch.SearchById(id, false);
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
            const showEvent = new EventSearch_1.EventSearch(adminVerify, employeeVerify, verifyResult);
            const eventSearchFilter = new EventSearchFilter_1.EventSearchFilter('id', id, showEvent);
            const updateCheck = await eventSearchFilter.Filter();
            return updateCheck;
        }
        catch (e) {
            return console.log(e);
        }
    }
    async Delete(id) {
        try {
            const localEmployeeVerify = await this._employeeLoginVerify.Verify();
            const localAdminVerify = await this._adminLoginVerify.Verify();
            this._verifyResult.Result(localEmployeeVerify, localAdminVerify);
            const employeeVerify = new EmployeeLoginVerify_1.EmployeeLoginVerify();
            const adminVerify = new AdminLoginVerify_1.AdminLoginVerify();
            const verifyResult = new VerifyResult_1.VerifyResult();
            const eventSearch = new EventSearch_1.EventSearch(adminVerify, employeeVerify, verifyResult);
            await eventSearch.SearchById(id, false);
            const deleteEvent = await prisma_1.prisma.event.delete({
                where: {
                    id: id,
                },
            });
            return console.log(`Evento ${deleteEvent.id} deletado`);
        }
        catch (e) {
            return console.log(e);
        }
    }
}
exports.Event = Event;
