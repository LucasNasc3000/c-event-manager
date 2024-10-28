"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSearchFilter = void 0;
/* eslint-disable no-unused-vars */
const EventSearch_1 = require("./EventSearch");
class EventSearchFilter {
    constructor(searchParam, data, eventSearch = new EventSearch_1.EventSearch()) {
        this.searchParam = searchParam;
        this.data = data;
        this.eventSearch = eventSearch;
    }
    async Filter() {
        switch (this.searchParam) {
            case 'id':
                await this.eventSearch.SearchById(this.data, true);
                break;
            case 'eventCreator':
                await this.eventSearch.SearchByEventCreator(this.data);
                break;
            case 'date':
                await this.eventSearch.SearchByDate(this.data);
                break;
            case 'hour':
                await this.eventSearch.SearchByHour(this.data);
                break;
            case 'name':
                await this.eventSearch.SearchByName(this.data);
                break;
            case 'hosts':
                await this.eventSearch.SearchByHosts(this.data);
                break;
            case 'location':
                await this.eventSearch.SearchByLocation(this.data);
                break;
            case 'plattform':
                await this.eventSearch.SearchByPlattform(this.data);
                break;
            case 'ecid':
                await this.eventSearch.SearchByEventCreatorId(this.data);
                break;
            default:
                return;
        }
    }
}
exports.EventSearchFilter = EventSearchFilter;
