/* eslint-disable no-unused-vars */
import { LogoutsSearch } from './LogoutsSearch';
import { LogsSearchAbstract } from '../interfaces/LogsSearchAbstract';

export class LogoutsSearchFilter implements LogsSearchAbstract {
  constructor(
    public _searchParam: string,
    public _data: string,
    public logoutsSearch: LogoutsSearch = new LogoutsSearch(),
  ) {}

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
