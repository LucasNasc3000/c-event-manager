"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSearchFilter = void 0;
class EventSearchFilter {
    constructor(_searchParam, _data, eventSearch) {
        this._searchParam = _searchParam;
        this._data = _data;
        this.eventSearch = eventSearch;
    }
    async Filter() {
        switch (this._searchParam) {
            case 'id':
                await this.eventSearch.SearchById(this._data, true);
                break;
            case 'eventCreator':
                await this.eventSearch.SearchByEventCreator(this._data);
                break;
            case 'date':
                await this.eventSearch.SearchByDate(this._data);
                break;
            case 'hour':
                await this.eventSearch.SearchByHour(this._data);
                break;
            case 'name':
                await this.eventSearch.SearchByName(this._data);
                break;
            case 'hosts':
                await this.eventSearch.SearchByHosts(this._data);
                break;
            case 'location':
                await this.eventSearch.SearchByLocation(this._data);
                break;
            case 'plattform':
                await this.eventSearch.SearchByPlattform(this._data);
                break;
            case 'ecid':
                await this.eventSearch.SearchByEventCreatorId(this._data);
                break;
            default:
                return;
        }
    }
}
exports.EventSearchFilter = EventSearchFilter;
