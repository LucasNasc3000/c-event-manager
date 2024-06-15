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
    constructor(name = '', password = '', email = '') {
        this._name = '';
        this._password = '';
        this._email = '';
        this._name = name;
        this._password = password;
        this._email = email;
    }
    async UserCreate() {
        const fieldsCheck = this.fieldsCheck();
        if (fieldsCheck === true) {
            return console.log('Email, nome ou senha nao foram preenchidos');
        }
        if (this._name !== 'adm@mail.com' &&
            this._password !== 'Dont_Forget_A_Senha!_') {
            const empl = new Employee_1.Employee(this._name, this._email, this._password);
            const emplCreate = await empl.Create();
            return emplCreate;
        }
        const admin = await UserAdmin_1.UserAdmin.CreateAdmin(this._name, this._password);
        return admin;
    }
    async Login() {
        if (this._name === 'adm@mail.com' &&
            this._password === 'Dont_Forget_A_Senha!_') {
            UserAdmin_1.UserAdmin.adminLogin(this._name, this._password);
            return 'Administrador logado com sucesso';
        }
    }
    async Logout() {
        UserAdmin_1.UserAdmin.adminLogout(this._name, this._password);
        console.log('Administrador deslogado');
    }
    async employeesList() {
        const empl = new Employee_1.Employee();
        const emplList = await empl.EmployeeList();
        return emplList;
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
