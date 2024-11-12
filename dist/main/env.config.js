"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    apiUrl: (_a = process.env.API_URL) !== null && _a !== void 0 ? _a : '',
    accessKey: (_b = process.env.ACCESS_KEY) !== null && _b !== void 0 ? _b : '',
    secretKey: (_c = process.env.SECRET_KEY) !== null && _c !== void 0 ? _c : '',
    acceptContentType: (_d = process.env.ACCEPT_CONTENT_TYPE) !== null && _d !== void 0 ? _d : ''
};
if (!exports.config.apiUrl || !exports.config.accessKey || !exports.config.secretKey || !exports.config.acceptContentType) {
    throw new Error("Missing required environment variables in .env file");
}
