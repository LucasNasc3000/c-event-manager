"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
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
    async UserCreate() {
        const fieldsCheck = this.fieldsCheck();
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
            UserAdmin_1.UserAdmin.adminLogin(this._email, this._password);
            return;
        }
        const empl = new Employee_1.Employee('', this._email, this._password);
        const employeeLogin = empl.Login();
        return employeeLogin;
    }
    async adminLogout() {
        UserAdmin_1.UserAdmin.adminLogout();
    }
    async employeeLogout() {
        const empl = new Employee_1.Employee('', this._email);
        return empl.Logout();
    }
    async employeesList() {
        const emplList = await this.empl.EmployeeList();
        return emplList;
    }
    async employeeUpdate(data) {
        if (typeof this._id === 'undefined' ||
            this._id === '' ||
            this._id === null) {
            return 'id nao informado';
        }
        const emplUpdate = await this.empl.Update(this._id, data);
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
            await this.empl.searchByEmail(searchValue);
        }
        else if (alphabetRegex.test(searchValue)) {
            await this.empl.searchByName(searchValue);
        }
        else {
            const searchId = await this.empl.searchById(searchValue);
            if (searchId === null) {
                return console.log(`Funcionario de id: ${searchValue} inexistente ou o dado de busca foi informado incorretamente.`);
            }
        }
    }
    fieldsCheck() {
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
