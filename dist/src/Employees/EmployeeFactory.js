"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeFactory = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
const Employee_1 = require("./Employee");
const EmployeeSearchFilter_1 = require("./EmployeeSearchFilter");
const UserAdmin_1 = require("./UserAdmin");
class EmployeeFactory {
    constructor(email = '', password = '', name = '') {
        this._name = '';
        this._password = '';
        this._email = '';
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
        if (!this._name.includes('adm')) {
            const empl = new Employee_1.Employee(this._name, this._email, this._password);
            await empl.Create();
        }
        await UserAdmin_1.UserAdmin.CreateAdmin(this._email, this._password);
    }
    async Login() {
        if (this._email.includes('adm')) {
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
        const empl = new Employee_1.Employee();
        await empl.List();
    }
    async EmployeeUpdate(id, data) {
        if (typeof id === 'undefined' || id === '' || id === null) {
            return 'id nao informado';
        }
        if (data.length < 1)
            return 'nenhum dado informado';
        const empl = new Employee_1.Employee();
        await empl.Update(id, data);
    }
    async Delete(id) {
        const empl = new Employee_1.Employee();
        await empl.Delete(id);
    }
    async Search(searchParam, searchValue) {
        const employeeSearch = new EmployeeSearchFilter_1.EmployeeSearchFilter(searchParam, searchValue);
        await employeeSearch.Filter();
    }
    FieldsCheck() {
        const fields = [this._name, this._email, this._password];
        for (let i = 0; i < fields.length; i++) {
            if (fields[i] !== '')
                return true;
            if (fields[i] !== null)
                return true;
            if (typeof fields[i] !== 'undefined')
                return true;
        }
        return false;
    }
}
exports.EmployeeFactory = EmployeeFactory;
