export interface EventSearchAbstract {
  SearchById(_id: string, _isSearch: boolean): Promise<void | object>;
  SearchByEventCreator(_eventCreatorParam: string): Promise<void | object>;
  SearchByDate(_dateParam: string): Promise<void | object>;
  SearchByHour(_hourParam: string): Promise<void | object>;
  SearchByName(_nameParam: string): Promise<void | object>;
  SearchByHosts(_hostsParam: string): Promise<void | object>;
  SearchByLocation(_locationParam: string): Promise<void | object>;
  SearchByPlattform(_plattformParam: string): Promise<void | object>;
  SearchByEventCreatorId(_eventCreatorIdParam: string): Promise<void | object>;
}
