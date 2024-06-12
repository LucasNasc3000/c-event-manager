"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
// import { options } from './index';
const Employee_1 = require("./Employee");
const UserAdmin_1 = require("./UserAdmin");
class UserFactory {
    constructor(_name, _password, _email) {
        this._name = _name;
        this._password = _password;
        this._email = _email;
    }
    get name() {
        return this._name;
    }
    get email() {
        if (this._email) {
            return this._email;
        }
        return 'email nao provido';
    }
    set name(name) {
        this._name = name;
    }
    set email(email) {
        this._email = email;
    }
    async UserClassesCall() {
        if (this._name !== 'adm@mail.com' &&
            this._password !== 'Dont_Forget_A_Senha!_') {
            const empl = new Employee_1.Employee(this._name, this.email, this._password);
            const emplCreate = await empl.Create();
            return emplCreate;
        }
        const admin = await UserAdmin_1.UserAdmin.CreateAdmin(this._name, this._password);
        return admin;
    }
}
exports.UserFactory = UserFactory;
