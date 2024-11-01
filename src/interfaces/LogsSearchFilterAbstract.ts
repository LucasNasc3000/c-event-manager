export interface LogsSearchFilterAbstract {
  _searchParam: string;
  _data: string;
  Filter(): Promise<void>;
}
