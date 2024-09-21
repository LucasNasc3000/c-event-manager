"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
const dotenv_1 = __importDefault(require("dotenv"));
const Employee_1 = require("./Employee");
const UserAdmin_1 = require("./UserAdmin");
dotenv_1.default.config();
class UserFactory {
    constructor(email = '', password = '', name = '', id = '') {
        this._name = '';
        this._password = '';
        this._email = '';
        this._id = '';
        this.empl = new Employee_1.Employee();
        this._email = email;
        this._password = password;
        this._name = name;
        this._id = id;
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
            const emplCreate = await empl.Create();
            return emplCreate;
        }
        const admin = await UserAdmin_1.UserAdmin.CreateAdmin(this._email, this._password);
        return admin;
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
        return empl.Logout();
    }
    async EmployeesList() {
        const emplList = await this.empl.List();
        return emplList;
    }
    async EmployeeUpdate(id, data) {
        if (typeof id === 'undefined' || id === '' || id === null) {
            return 'id nao informado';
        }
        const emplUpdate = await this.empl.Update(id, data);
        return emplUpdate;
    }
    async Delete(id) {
        await this.empl.Delete(id);
    }
    async Search(searchValue) {
        const alphabetRegex = /^[a-zA-Z]+$/;
        if (searchValue === '') {
            return console.log('Dado nao informado');
        }
        if (searchValue.includes('@') || searchValue.includes('.com')) {
            await this.empl.SearchByEmail(searchValue);
        }
        else if (alphabetRegex.test(searchValue)) {
            await this.empl.SearchByName(searchValue);
        }
        else {
            const searchId = await this.empl.SearchById(searchValue);
            if (searchId === null) {
                return console.log(`Funcionario de id: ${searchValue} inexistente ou o dado de busca foi informado incorretamente.`);
            }
        }
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
exports.UserFactory = UserFactory;
