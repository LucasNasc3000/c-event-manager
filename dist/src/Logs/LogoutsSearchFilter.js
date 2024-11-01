"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutsSearchFilter = void 0;
class LogoutsSearchFilter {
    constructor(_searchParam, _data, _logoutsSearch) {
        this._searchParam = _searchParam;
        this._data = _data;
        this._logoutsSearch = _logoutsSearch;
    }
    SearchById() {
        throw new Error('Method not implemented.');
    }
    SearchByEmail() {
        throw new Error('Method not implemented.');
    }
    SearchByDate() {
        throw new Error('Method not implemented.');
    }
    SearchByHour() {
        throw new Error('Method not implemented.');
    }
    async Filter() {
        switch (this._searchParam) {
            case 'id':
                await this._logoutsSearch.SearchById(this._data);
                break;
            case 'email':
                await this._logoutsSearch.SearchByEmail(this._data);
                break;
            case 'date':
                await this._logoutsSearch.SearchByDate(this._data);
                break;
            case 'hour':
                await this._logoutsSearch.SearchByHour(this._data);
                break;
            default:
                return;
        }
    }
}
exports.LogoutsSearchFilter = LogoutsSearchFilter;
