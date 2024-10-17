"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyResult = void 0;
class VerifyResult {
    Result(employeeLoginVerify, adminLoginVerify) {
        switch (true) {
            case employeeLoginVerify === null && adminLoginVerify === false:
                throw new Error('Operacao nao autorizada, login do administrador necessário');
            case employeeLoginVerify === false && adminLoginVerify === null:
                throw new Error('Operação não autorizada, login de funcionário necessário');
            case employeeLoginVerify === false && adminLoginVerify === false:
                throw new Error('Operacao nao autorizada. Login do funcionário ou do administrador necessário');
            case employeeLoginVerify === null && adminLoginVerify === null:
                throw new Error('Erro desconhecido ao verificar login');
        }
    }
}
exports.VerifyResult = VerifyResult;
