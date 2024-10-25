import { AdminLoginVerify } from '../LoginVerify/AdminLoginVerify';
import { VerifyResult } from '../LoginVerify/VerifyResult';

export interface Auth {
  adminLoginVerify: AdminLoginVerify;
  verifyResult: VerifyResult;
}
