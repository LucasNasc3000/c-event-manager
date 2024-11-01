import { Logs } from './Logs';
import { Logouts } from './Logouts';
import { LogoutsSearchFilter } from './LogoutsSearchFilter';
import { LogsAbstract } from '../interfaces/LogsAbstract';
import { LogsSearchFilterAbstract } from '../interfaces/LogsSearchFilterAbstract';
import { LogsSearchFilter } from './LogsSearchFilter';
import { LogoutsSearch } from './LogoutsSearch';
import { AdminLoginVerify } from '../LoginVerify/AdminLoginVerify';
import { VerifyResult } from '../LoginVerify/VerifyResult';

export class LogFactory implements LogsAbstract, LogsSearchFilterAbstract {
  constructor(
    public _isLog: boolean,
    public _searchParam: string = '',
    public _data: string = '',
    public _dateTime: string[] = [],
    public _email: string = '',
    public _logs: Logs = new Logs(),
    public _logouts: Logouts = new Logouts(),
  ) {
    this._logs = new Logs(this._email, this._dateTime);
    this._logouts = new Logouts(this._email, this._dateTime);
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
    const _adm: AdminLoginVerify = new AdminLoginVerify();
    const _result: VerifyResult = new VerifyResult();
    const _lgs: LogoutsSearch = new LogoutsSearch(_adm, _result);
    if (this._isLog === false) {
      const logoutSearch: LogoutsSearchFilter = new LogoutsSearchFilter(
        this._searchParam,
        this._data,
        _lgs,
      );
      await logoutSearch.Filter();
      return;
    }

    const logSearch: LogsSearchFilter = new LogsSearchFilter(
      this._searchParam,
      this._data,
    );
    await logSearch.Filter();
  }
}
