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
Object.defineProperty(exports, "__esModule", { value: true });
const axios_service_1 = require("./axios.service");
const env_config_1 = require("./env.config");
const xml_helper_1 = require("./xml.helper");
const currentContentType = env_config_1.config.acceptContentType;
const credentialsJson = {
    accessKey: env_config_1.config.accessKey,
    secretKey: env_config_1.config.secretKey
};
const credentialsXML = (0, xml_helper_1.parseWrite)("credentials", credentialsJson);
const propertiesJson = require("../../input/properties.example.json");
const propertiesXMLPath = "./input/properties.example.xml";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            if ("application/xml" === currentContentType) {
                console.log("\n Using XML as content type");
                const authData = yield (0, axios_service_1.postAuth)(credentialsXML);
                console.log("\n Auth Response:", authData);
                const parsedData = yield (0, xml_helper_1.parseRead)(authData);
                const accessToken = (_b = (_a = parsedData === null || parsedData === void 0 ? void 0 : parsedData.MessageData) === null || _a === void 0 ? void 0 : _a.data[0]) === null || _b === void 0 ? void 0 : _b.accessToken[0];
                console.log("\n Access Token:", accessToken);
                if (accessToken) {
                    const propertiesXML = yield (0, xml_helper_1.readXmlFile)(propertiesXMLPath);
                    const propertiesResponse = yield (0, axios_service_1.postProperties)(accessToken, propertiesXML);
                    console.log("\n Property creation response:", propertiesResponse);
                }
            }
            else {
                console.log("\n Using JSON as content type");
                const authData = yield (0, axios_service_1.postAuth)(JSON.stringify(credentialsJson));
                console.log("\n Auth Response:", authData);
                const accessToken = (_c = authData === null || authData === void 0 ? void 0 : authData.data) === null || _c === void 0 ? void 0 : _c.accessToken;
                console.log("\n Access Token:", accessToken);
                if (accessToken) {
                    const propertiesResponse = yield (0, axios_service_1.postProperties)(accessToken, JSON.stringify(propertiesJson));
                    console.log("\n Property creation response:", propertiesResponse);
                }
            }
        }
        catch (error) {
            console.error("\n Error:", error.response ? error.response.data : error.message);
        }
    });
}
main();
