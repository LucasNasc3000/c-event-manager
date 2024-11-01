export interface SearchFilterAbstract {
  _searchParam: string;
  _data: string;
  Filter(): Promise<void>;
}

export interface EmployeeSearchFilterAbstract {
  Filter(): Promise<void>;
}
