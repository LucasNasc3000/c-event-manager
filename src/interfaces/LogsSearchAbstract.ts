export interface LogsSearchAbstract {
  SearchById(_id: string): Promise<void | object>;
  SearchByEmail(_emailSearchValue: string): Promise<void | object>;
  SearchByDate(_dateSearchValue: string): Promise<void | object>;
  SearchByHour(_hourSearchValue: string): Promise<void | object>;
}
