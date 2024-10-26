/* eslint-disable no-unused-vars */
import { LogsSearch } from './LogsSearch';
import { LogsSearchAbstract } from '../interfaces/LogsSearchAbstract';

export class LogsSearchFilter implements LogsSearchAbstract {
  constructor(
    public _searchParam: string,
    public _data: string,
    public logsSearch: LogsSearch = new LogsSearch(),
  ) {}

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
