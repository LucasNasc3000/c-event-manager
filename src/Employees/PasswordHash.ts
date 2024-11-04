import bcrypt from 'bcryptjs';

export class PasswordHash {
  constructor(private _password: string = '') {}

  async Hash() {
    try {
      const hashResult = await bcrypt.hash(this._password, 8);
      return hashResult;
    } catch (e) {
      return e;
    }
  }

  async Compare(hash: string) {
    try {
      const passwordCheck = await bcrypt.compare(hash, this._password);
      return passwordCheck;
    } catch (e) {
      return e;
    }
  }
}
