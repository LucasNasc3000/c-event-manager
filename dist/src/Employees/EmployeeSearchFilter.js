"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeSearchFilter = void 0;
class EmployeeSearchFilter {
    constructor(searchParam, data, employeeSearch) {
        this.searchParam = searchParam;
        this.data = data;
        this.employeeSearch = employeeSearch;
    }
    SearchById(_id, _isSearch) {
        throw new Error('Method not implemented.');
    }
    SearchByEmail(_emailSearchValue) {
        throw new Error('Method not implemented.');
    }
    SearchByName(_nameSearchValue, _isSearch) {
        throw new Error('Method not implemented.');
    }
    async Filter() {
        switch (this.searchParam) {
            case 'id':
                await this.employeeSearch.SearchById(this.data, true);
                break;
            case 'name':
                await this.employeeSearch.SearchByName(this.data, true);
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
