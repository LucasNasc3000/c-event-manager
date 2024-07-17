"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTime = void 0;
function DateTime() {
    const date = new Date();
    const dateTime = [];
    const loginTime = date.toLocaleTimeString('pt-BR', {
        hour12: false,
    });
    const loginDate = date.toLocaleDateString('pt-BR', {
        dateStyle: 'short',
    });
    dateTime.push(loginDate, loginTime);
    return dateTime;
}
exports.DateTime = DateTime;
