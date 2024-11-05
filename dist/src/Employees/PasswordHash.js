"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordHash = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class PasswordHash {
    constructor(_password = '') {
        this._password = _password;
    }
    async Hash() {
        try {
            const hashResult = await bcryptjs_1.default.hash(this._password, 8);
            return hashResult;
        }
        catch (e) {
            return e;
        }
    }
    async Compare(hash) {
        try {
            const passwordCheck = await bcryptjs_1.default.compare(this._password, hash);
            return passwordCheck;
        }
        catch (e) {
            return e;
        }
    }
}
exports.PasswordHash = PasswordHash;
