"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsSearchFilter = void 0;
/* eslint-disable no-unused-vars */
const LogsSearch_1 = require("./LogsSearch");
class LogsSearchFilter {
    constructor(searchParam, data, logsSearch = new LogsSearch_1.LogsSearch()) {
        this.searchParam = searchParam;
        this.data = data;
        this.logsSearch = logsSearch;
    }
    async Filter() {
        switch (this.searchParam) {
            case 'id':
                await this.logsSearch.LogSearchId(this.data);
                break;
            case 'email':
                await this.logsSearch.LogSearchEmail(this.data);
                break;
            case 'date':
                await this.logsSearch.LogSearchDate(this.data);
                break;
            case 'hour':
                await this.logsSearch.LogSearchHour(this.data);
                break;
            // case this.searchParam === 'id':
            //   await this.logsSearch.LogoutSearchId(this.data);
            //   break;
            // case this.searchParam === 'email':
            //   await this.logsSearch.LogoutSearchEmail(this.data);
            //   break;
            // case this.searchParam === 'date':
            //   await this.logsSearch.LogoutSearchDate(this.data);
            //   break;
            // case this.searchParam === 'hour':
            //   await this.logsSearch.LogoutSearchHour(this.data);
            //   break;
            default:
                return;
        }
    }
}
exports.LogsSearchFilter = LogsSearchFilter;
