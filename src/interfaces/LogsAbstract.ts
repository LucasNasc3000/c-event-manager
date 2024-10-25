export interface LogsAbstract {
  _dateTime: string[];
  _email: string;
  Create(): Promise<void>;
  List(): Promise<void>;
}
