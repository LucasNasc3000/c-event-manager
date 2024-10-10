/* eslint-disable no-unused-vars */
import { EventSearch } from './EventSearch';

export class EventSearchFilter {
  constructor(
    private searchParam: string,
    private data: string,
    private eventSearch: EventSearch = new EventSearch(),
  ) {}

  async Filter() {
    switch (this.searchParam) {
      case 'id':
        await this.eventSearch.SearchById(this.data);
        break;

      case 'eventCreator':
        await this.eventSearch.SearchByEventCreator(this.data);
        break;

      case 'date':
        await this.eventSearch.SearchByDate(this.data);
        break;

      case 'hour':
        await this.eventSearch.SearchByHour(this.data);
        break;

      case 'name':
        await this.eventSearch.SearchByName(this.data);
        break;

      case 'hosts':
        await this.eventSearch.SearchByHosts(this.data);
        break;

      case 'location':
        await this.eventSearch.SearchByLocation(this.data);
        break;

      case 'plattform':
        await this.eventSearch.SearchByPlattform(this.data);
        break;

      case 'ecid':
        await this.eventSearch.SearchByEventCreatorId(this.data);
        break;

      default:
        return;
    }
  }
}
