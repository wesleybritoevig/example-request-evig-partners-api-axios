"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postProperties = exports.postAuth = void 0;
const env_config_1 = require("./env.config");
const axios_1 = __importDefault(require("axios"));
const api = axios_1.default.create({
    baseURL: env_config_1.config.apiUrl,
    headers: {
        'Accept': env_config_1.config.acceptContentType,
        'Content-Type': env_config_1.config.acceptContentType
    }
});
const postAuth = (requestBody) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield api.post('api/v1/auth/login', requestBody);
        return response.data;
    }
    catch (error) {
        console.error("\n Error in postProperties:", error.response ? error.response.data : error.message);
        throw error;
    }
});
exports.postAuth = postAuth;
const postProperties = (accessToken, requestBody) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield api.post('api/v2/properties', requestBody, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("\n Error in postProperties:", error.response ? error.response.data : error.message);
        throw error;
    }
});
exports.postProperties = postProperties;
