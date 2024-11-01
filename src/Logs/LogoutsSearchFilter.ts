import { LogsSearchAbstract } from '../interfaces/LogsSearchAbstract';
import { SearchFilterAbstract } from '../interfaces/SearchFilterAbstracts';

export class LogoutsSearchFilter
  implements LogsSearchAbstract, SearchFilterAbstract
{
  constructor(
    public _searchParam: string,
    public _data: string,
    public _logoutsSearch: LogsSearchAbstract,
  ) {}
  SearchById(): Promise<void | object> {
    throw new Error('Method not implemented.');
  }
  SearchByEmail(): Promise<void | object> {
    throw new Error('Method not implemented.');
  }
  SearchByDate(): Promise<void | object> {
    throw new Error('Method not implemented.');
  }
  SearchByHour(): Promise<void | object> {
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
