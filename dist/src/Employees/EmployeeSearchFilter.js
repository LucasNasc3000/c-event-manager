"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeSearchFilter = void 0;
/* eslint-disable no-unused-vars */
const EmployeeSearch_1 = require("./EmployeeSearch");
class EmployeeSearchFilter {
    constructor(searchParam, data, employeeSearch = new EmployeeSearch_1.EmployeeSearch()) {
        this.searchParam = searchParam;
        this.data = data;
        this.employeeSearch = employeeSearch;
    }
    async Filter() {
        switch (this.searchParam) {
            case 'id':
                await this.employeeSearch.SearchById(this.data);
                break;
            case 'name':
                await this.employeeSearch.SearchByName(this.data);
                break;
            case 'email':
                await this.employeeSearch.SearchByEmail(this.data);
                break;
            default:
                return;
        }
    }
}
exports.EmployeeSearchFilter = EmployeeSearchFilter;
