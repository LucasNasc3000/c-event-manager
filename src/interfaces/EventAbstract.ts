export interface EventAbstract {
  Create(_data: string[]): Promise<void>;
  List(): Promise<void>;
  Update(_id: string, _data: string[]): Promise<void> | object;
  Delete(_id: string): Promise<void>;
}
