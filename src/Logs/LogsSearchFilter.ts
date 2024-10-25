/* eslint-disable no-unused-vars */
import { LogsSearch } from './LogsSearch';
import { LogsSearchAbstract } from '../interfaces/LogsSearchAbstract';

export class LogsSearchFilter implements LogsSearchAbstract {
  constructor(
    public searchParam: string,
    public data: string,
    public logsSearch: LogsSearch = new LogsSearch(),
  ) {}

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

      default:
        return;
    }
  }
}
