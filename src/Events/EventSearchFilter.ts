/* eslint-disable no-unused-vars */
import { EventSearchAbstract } from '../interfaces/EventSearchAbstract';
import { SearchFilterAbstract } from '../interfaces/SearchFilterAbstracts';

export class EventSearchFilter implements SearchFilterAbstract {
  constructor(
    public _searchParam: string,
    public _data: string,
    public eventSearch: EventSearchAbstract,
  ) {}

  async Filter() {
    switch (this._searchParam) {
      case 'id':
        await this.eventSearch.SearchById(this._data, true);
        break;

      case 'eventCreator':
        await this.eventSearch.SearchByEventCreator(this._data);
        break;

      case 'date':
        await this.eventSearch.SearchByDate(this._data);
        break;

      case 'hour':
        await this.eventSearch.SearchByHour(this._data);
        break;

      case 'name':
        await this.eventSearch.SearchByName(this._data);
        break;

      case 'hosts':
        await this.eventSearch.SearchByHosts(this._data);
        break;

      case 'location':
        await this.eventSearch.SearchByLocation(this._data);
        break;

      case 'plattform':
        await this.eventSearch.SearchByPlattform(this._data);
        break;

      case 'ecid':
        await this.eventSearch.SearchByEventCreatorId(this._data);
        break;

      default:
        return;
    }
  }
}
