export interface EmployeeSearchAbstract {
  SearchById(_id: string, _isSearch?: boolean): Promise<void | object>;
  SearchByEmail(_emailSearchValue: string): Promise<void | object>;
  SearchByName(_nameSearchValue: string): Promise<void | object>;
}
