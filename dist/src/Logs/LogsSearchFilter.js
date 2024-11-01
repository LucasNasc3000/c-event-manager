"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsSearchFilter = void 0;
class LogsSearchFilter {
    constructor(_searchParam, _data, logsSearch) {
        this._searchParam = _searchParam;
        this._data = _data;
        this.logsSearch = logsSearch;
    }
    SearchById(_id) {
        throw new Error('Method not implemented.');
    }
    SearchByEmail(_emailSearchValue) {
        throw new Error('Method not implemented.');
    }
    SearchByDate(_dateSearchValue) {
        throw new Error('Method not implemented.');
    }
    SearchByHour(_hourSearchValue) {
        throw new Error('Method not implemented.');
    }
    async Filter() {
        switch (this._searchParam) {
            case 'id':
                await this.logsSearch.SearchById(this._data);
                break;
            case 'email':
                await this.logsSearch.SearchByEmail(this._data);
                break;
            case 'date':
                await this.logsSearch.SearchByDate(this._data);
                break;
            case 'hour':
                await this.logsSearch.SearchByHour(this._data);
                break;
            default:
                return;
        }
    }
}
exports.LogsSearchFilter = LogsSearchFilter;
