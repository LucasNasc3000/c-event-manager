export interface Auth {
  Verify(): Promise<unknown>;
}

export interface AuthResult {
  Result(_employeeVerify: unknown, _adminVerify: unknown): void;
}
