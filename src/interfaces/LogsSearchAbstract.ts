export interface LogsSearchAbstract {
  _searchParam: string;
  _data: string;
  Filter(): Promise<void>;
}
