/* eslint-disable no-unused-vars */
import { LogsSearch } from './LogsSearch';

export class LogsSearchFilter {
  constructor(
    private searchParam: string,
    private data: string,
    private logsSearch: LogsSearch = new LogsSearch(),
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
