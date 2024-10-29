import { AdminLoginVerify } from '../LoginVerify/AdminLoginVerify';
import { EmployeeLoginVerify } from '../LoginVerify/EmployeeLoginVerify';
import { VerifyResult } from '../LoginVerify/VerifyResult';

export interface Auth {
  adminLoginVerify: AdminLoginVerify;
  verifyResult: VerifyResult;
}

export interface EmployeeAuth extends Auth {
  employeeLoginVerify: EmployeeLoginVerify;
}
