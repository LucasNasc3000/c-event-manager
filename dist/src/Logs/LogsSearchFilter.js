"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsSearchFilter = void 0;
/* eslint-disable no-unused-vars */
const LogsSearch_1 = require("./LogsSearch");
class LogsSearchFilter {
    constructor(_searchParam, _data, logsSearch = new LogsSearch_1.LogsSearch()) {
        this._searchParam = _searchParam;
        this._data = _data;
        this.logsSearch = logsSearch;
    }
    async Filter() {
        switch (this._searchParam) {
            case 'id':
                await this.logsSearch.LogSearchId(this._data);
                break;
            case 'email':
                await this.logsSearch.LogSearchEmail(this._data);
                break;
            case 'date':
                await this.logsSearch.LogSearchDate(this._data);
                break;
            case 'hour':
                await this.logsSearch.LogSearchHour(this._data);
                break;
            default:
                return;
        }
    }
}
exports.LogsSearchFilter = LogsSearchFilter;
