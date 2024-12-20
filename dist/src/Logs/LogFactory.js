"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogFactory = void 0;
const Logs_1 = require("./Logs");
const Logouts_1 = require("./Logouts");
const LogoutsSearchFilter_1 = require("./LogoutsSearchFilter");
const LogsSearchFilter_1 = require("./LogsSearchFilter");
const LogoutsSearch_1 = require("./LogoutsSearch");
const AdminLoginVerify_1 = require("../LoginVerify/AdminLoginVerify");
const VerifyResult_1 = require("../LoginVerify/VerifyResult");
const LogsSearch_1 = require("./LogsSearch");
class LogFactory {
    constructor(_isLog, _searchParam = '', _data = '', _dateTime = [], _email = '', _logs = new Logs_1.Logs(), _logouts = new Logouts_1.Logouts()) {
        this._isLog = _isLog;
        this._searchParam = _searchParam;
        this._data = _data;
        this._dateTime = _dateTime;
        this._email = _email;
        this._logs = _logs;
        this._logouts = _logouts;
        this._logs = new Logs_1.Logs(this._email, this._dateTime);
        this._logouts = new Logouts_1.Logouts(this._email, this._dateTime);
    }
    async Create() {
        if (this._isLog === false) {
            await this._logouts.Create();
            return;
        }
        await this._logs.Create();
    }
    async List() {
        if (this._isLog === false) {
            await this._logouts.List();
            return;
        }
        await this._logs.List();
    }
    async Filter() {
        const _adm = new AdminLoginVerify_1.AdminLoginVerify();
        const _result = new VerifyResult_1.VerifyResult();
        const _lgos = new LogoutsSearch_1.LogoutsSearch(_adm, _result);
        const _lgs = new LogsSearch_1.LogsSearch(_adm, _result);
        if (this._isLog === false) {
            const logoutSearch = new LogoutsSearchFilter_1.LogoutsSearchFilter(this._searchParam, this._data, _lgos);
            await logoutSearch.Filter();
            return;
        }
        const logSearch = new LogsSearchFilter_1.LogsSearchFilter(this._searchParam, this._data, _lgs);
        await logSearch.Filter();
    }
}
exports.LogFactory = LogFactory;
