/* eslint-disable no-unused-vars */
import { EmployeeSearch } from './EmployeeSearch';

export class EmployeeSearchFilter {
  constructor(
    private searchParam: string,
    private data: string,
    private employeeSearch: EmployeeSearch = new EmployeeSearch(),
  ) {}

  async Filter() {
    switch (this.searchParam) {
      case 'id':
        await this.employeeSearch.SearchById(this.data);
        break;

      case 'name':
        await this.employeeSearch.SearchByName(this.data);
        break;

      case 'email':
        await this.employeeSearch.SearchByEmail(this.data);
        break;

      default:
        return;
    }
  }
}
