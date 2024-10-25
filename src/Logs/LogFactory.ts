import { Logs } from './Logs';
import { Logouts } from './Logouts';
import { LogoutsSearchFilter } from './LogoutsSearchFilter';
import { LogsAbstract } from '../interfaces/LogsAbstract';
import { LogsSearchAbstract } from '../interfaces/LogsSearchAbstract';
import { LogsSearchFilter } from './LogsSearchFilter';

export class LogFactory implements LogsAbstract, LogsSearchAbstract {
  constructor(
    public _searchParam: string = '',
    public _data: string = '',
    public _dateTime: string[] = [],
    public _email: string = '',
    public _logs: Logs = new Logs(this._email, this._dateTime),
    public _logouts: Logouts = new Logouts(this._email, this._dateTime),
    public _isLog: boolean,
  ) {}

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
    if (this._isLog === false) {
      const logoutSearch: LogoutsSearchFilter = new LogoutsSearchFilter(
        this._searchParam,
        this._data,
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
