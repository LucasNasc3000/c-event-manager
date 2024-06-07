export class UserFactory {
  constructor(
    private _name: string,
    private _email: string,
    private _password: string,
  ) {}

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  set name(name: string) {
    this._name = name;
  }

  set email(email: string) {
    this._email = email;
  }

  // UserClassesCall(): void {
  //   if (
  //     this._name !== process.env.ADMIN_USER &&
  //     this._password !== process.env.ADMIN_PASS
  //   ) {

  //   }
  // }
}
