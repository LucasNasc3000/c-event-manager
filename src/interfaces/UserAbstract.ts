/* eslint-disable no-unused-vars */
export interface UserAbstract {
  Create(): Promise<void>;
  List(): Promise<void>;
  Update(
    id: string,
    data: string[],
  ):
    | Promise<void | null>
    | Promise<'id nao informado' | 'nenhum dado informado' | undefined>;
  Delete(id: string): Promise<void>;
  Login(): Promise<void>;
  Logout(): Promise<void>;
}
