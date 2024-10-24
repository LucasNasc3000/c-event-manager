"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeFactory = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
const dotenv_1 = __importDefault(require("dotenv"));
const Employee_1 = require("./Employee");
const EmployeeSearchFilter_1 = require("./EmployeeSearchFilter");
const UserAdmin_1 = require("./UserAdmin");
dotenv_1.default.config();
class EmployeeFactory {
    constructor(email = '', password = '', name = '') {
        this._name = '';
        this._password = '';
        this._email = '';
        this.empl = new Employee_1.Employee();
        this._email = email;
        this._password = password;
        this._name = name;
    }
    Create() {
        throw new Error('Method not implemented.');
    }
    List() {
        throw new Error('Method not implemented.');
    }
    Update(id, data) {
        throw new Error('Method not implemented.');
    }
    Logout() {
        throw new Error('Method not implemented.');
    }
    async UserCreate() {
        const fieldsCheck = this.FieldsCheck();
        if (fieldsCheck === false) {
            return console.log('Email, nome ou senha nao foram preenchidos');
        }
        if (this._name !== 'adm@30001') {
            const empl = new Employee_1.Employee(this._name, this._email, this._password);
            await empl.Create();
        }
        await UserAdmin_1.UserAdmin.CreateAdmin(this._email, this._password);
    }
    async Login() {
        if (this._email[0] === 'a' &&
            this._email[1] === 'd' &&
            this._email[2] === 'm') {
            return UserAdmin_1.UserAdmin.AdminLogin(this._email, this._password);
        }
        const empl = new Employee_1.Employee('', this._email, this._password);
        const employeeLogin = empl.Login();
        return employeeLogin;
    }
    async AdminLogout() {
        UserAdmin_1.UserAdmin.AdminLogout();
    }
    async EmployeeLogout() {
        const empl = new Employee_1.Employee('', this._email);
        empl.Logout();
    }
    async EmployeesList() {
        await this.empl.List();
    }
    async EmployeeUpdate(id, data) {
        if (typeof id === 'undefined' || id === '' || id === null) {
            return 'id nao informado';
        }
        if (data.length < 1)
            return 'nenhum dado informado';
        await this.empl.Update(id, data);
    }
    async Delete(id) {
        await this.empl.Delete(id);
    }
    async Search(searchParam, searchValue) {
        const employeeSearch = new EmployeeSearchFilter_1.EmployeeSearchFilter(searchParam, searchValue);
        await employeeSearch.Filter();
    }
    FieldsCheck() {
        const fields = [this._name, this._email, this._password];
        for (let i = 0; i < fields.length; i++) {
            if (fields[i] !== '') {
                return true;
            }
            if (fields[i] !== null) {
                return true;
            }
            if (typeof fields[i] !== 'undefined') {
                return true;
            }
        }
        return false;
    }
}
exports.EmployeeFactory = EmployeeFactory;
