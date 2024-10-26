"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutsSearchFilter = void 0;
/* eslint-disable no-unused-vars */
const LogoutsSearch_1 = require("./LogoutsSearch");
class LogoutsSearchFilter {
    constructor(_searchParam, _data, logoutsSearch = new LogoutsSearch_1.LogoutsSearch()) {
        this._searchParam = _searchParam;
        this._data = _data;
        this.logoutsSearch = logoutsSearch;
    }
    async Filter() {
        switch (this._searchParam) {
            case 'id':
                await this.logoutsSearch.LogoutSearchId(this._data);
                break;
            case 'email':
                await this.logoutsSearch.LogoutSearchEmail(this._data);
                break;
            case 'date':
                await this.logoutsSearch.LogoutSearchDate(this._data);
                break;
            case 'hour':
                await this.logoutsSearch.LogoutSearchHour(this._data);
                break;
            default:
                return;
        }
    }
}
exports.LogoutsSearchFilter = LogoutsSearchFilter;
