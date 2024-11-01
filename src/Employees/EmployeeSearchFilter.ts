/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { EmployeeSearchAbstract } from '../interfaces/EmployeeSearchAbstract';

export class EmployeeSearchFilter implements EmployeeSearchAbstract {
  constructor(
    private searchParam: string,
    private data: string,
    private employeeSearch: EmployeeSearchAbstract,
  ) {}
  SearchById(_id: string, _isSearch?: boolean): Promise<void | object> {
    throw new Error('Method not implemented.');
  }
  SearchByEmail(_emailSearchValue: string): Promise<void | object> {
    throw new Error('Method not implemented.');
  }
  SearchByName(_nameSearchValue: string): Promise<void | object> {
    throw new Error('Method not implemented.');
  }

  async Filter() {
    switch (this.searchParam) {
      case 'id':
        await this.employeeSearch.SearchById(this.data, true);
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
