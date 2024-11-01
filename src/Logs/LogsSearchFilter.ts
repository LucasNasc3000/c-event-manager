/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { LogsSearchAbstract } from '../interfaces/LogsSearchAbstract';
import { SearchFilterAbstract } from '../interfaces/SearchFilterAbstracts';

export class LogsSearchFilter
  implements LogsSearchAbstract, SearchFilterAbstract
{
  constructor(
    public _searchParam: string,
    public _data: string,
    public logsSearch: LogsSearchAbstract,
  ) {}
  SearchById(_id: string): Promise<void | object> {
    throw new Error('Method not implemented.');
  }
  SearchByEmail(_emailSearchValue: string): Promise<void | object> {
    throw new Error('Method not implemented.');
  }
  SearchByDate(_dateSearchValue: string): Promise<void | object> {
    throw new Error('Method not implemented.');
  }
  SearchByHour(_hourSearchValue: string): Promise<void | object> {
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
