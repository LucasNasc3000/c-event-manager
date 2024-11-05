"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeFactory = void 0;
const Employee_1 = require("./Employee");
const EmployeeSearchFilter_1 = require("./EmployeeSearchFilter");
const UserAdmin_1 = require("./UserAdmin");
const AdminLoginVerify_1 = require("../LoginVerify/AdminLoginVerify");
const VerifyResult_1 = require("../LoginVerify/VerifyResult");
const EmployeeSearch_1 = require("./EmployeeSearch");
class EmployeeFactory {
    constructor(_name = '', _email = '', _password = '') {
        this._name = _name;
        this._email = _email;
        this._password = _password;
    }
    async Create() {
        const admLoginVerify = new AdminLoginVerify_1.AdminLoginVerify();
        const verifyResult = new VerifyResult_1.VerifyResult();
        const fieldsCheck = this.FieldsCheck();
        if (fieldsCheck === false) {
            return console.log('Email, nome ou senha nao foram preenchidos');
        }
        if (this._name !== process.env.ADMIN_NAME) {
            const empl = new Employee_1.Employee(this._name, this._email, this._password, admLoginVerify, verifyResult);
            await empl.Create();
        }
        await UserAdmin_1.UserAdmin.CreateAdmin(this._name, this._email, this._password);
    }
    async Login() {
        if (this._email.includes('adm')) {
            const adminLogin = await UserAdmin_1.UserAdmin.AdminLogin(this._name, this._email, this._password);
            return adminLogin;
        }
        const admLoginVerify = new AdminLoginVerify_1.AdminLoginVerify();
        const verifyResult = new VerifyResult_1.VerifyResult();
        const empl = new Employee_1.Employee('', this._email, this._password, admLoginVerify, verifyResult);
        const employeeLogin = empl.Login();
        return employeeLogin;
    }
    async AdminLogout() {
        UserAdmin_1.UserAdmin.AdminLogout();
    }
    async Logout() {
        const admLoginVerify = new AdminLoginVerify_1.AdminLoginVerify();
        const verifyResult = new VerifyResult_1.VerifyResult();
        const empl = new Employee_1.Employee('', this._email, '', admLoginVerify, verifyResult);
        empl.Logout();
    }
    async List() {
        const admLoginVerify = new AdminLoginVerify_1.AdminLoginVerify();
        const verifyResult = new VerifyResult_1.VerifyResult();
        const empl = new Employee_1.Employee('', '', '', admLoginVerify, verifyResult);
        await empl.List();
    }
    async Update(id, data) {
        const admLoginVerify = new AdminLoginVerify_1.AdminLoginVerify();
        const verifyResult = new VerifyResult_1.VerifyResult();
        if (typeof id === 'undefined' || id === '' || id === null) {
            return 'id nao informado';
        }
        if (data.length < 1)
            return 'nenhum dado informado';
        const empl = new Employee_1.Employee('', '', '', admLoginVerify, verifyResult);
        await empl.Update(id, data);
    }
    async Delete(id, name) {
        const admLoginVerify = new AdminLoginVerify_1.AdminLoginVerify();
        const verifyResult = new VerifyResult_1.VerifyResult();
        const empl = new Employee_1.Employee(name, '', '', admLoginVerify, verifyResult);
        await empl.Delete(id, name);
    }
    async Search(searchParam, searchValue) {
        const admVerify = new AdminLoginVerify_1.AdminLoginVerify();
        const admVerifyResult = new VerifyResult_1.VerifyResult();
        const employeeSearch = new EmployeeSearch_1.EmployeeSearch(admVerify, admVerifyResult);
        const employeeSearchFilter = new EmployeeSearchFilter_1.EmployeeSearchFilter(searchParam, searchValue, employeeSearch);
        await employeeSearchFilter.Filter();
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
