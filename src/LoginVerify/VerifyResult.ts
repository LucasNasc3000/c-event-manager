export class VerifyResult {
  Result(employeeLoginVerify: unknown, adminLoginVerify: unknown): void {
    switch (true) {
      case employeeLoginVerify === null && adminLoginVerify === false:
        throw new Error(
          'Operacao nao autorizada, login do administrador necessário',
        );

      case employeeLoginVerify === false && adminLoginVerify === null:
        throw new Error(
          'Operação não autorizada, login de funcionário necessário',
        );

      case employeeLoginVerify === false && adminLoginVerify === false:
        throw new Error(
          'Operacao nao autorizada. Login do funcionário ou do administrador necessário',
        );

      case employeeLoginVerify === null && adminLoginVerify === null:
        throw new Error('Erro desconhecido ao verificar login');
    }
  }
}
