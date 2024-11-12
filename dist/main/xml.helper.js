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
exports.parseWrite = exports.parseRead = exports.readXmlFile = void 0;
const fs_1 = require("fs");
const js2xmlparser_1 = require("js2xmlparser");
const xml2js_1 = require("xml2js");
const readXmlFile = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const xmlData = yield fs_1.promises.readFile(filePath, "utf-8");
        return xmlData;
    }
    catch (error) {
        console.error("\nError reading XML file:", error);
        throw error;
    }
});
exports.readXmlFile = readXmlFile;
const parseRead = (xmlData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedData = yield (0, xml2js_1.parseStringPromise)(xmlData);
        return parsedData;
    }
    catch (error) {
        console.error("\n Error parsing XML:", error);
        throw error;
    }
});
exports.parseRead = parseRead;
const parseWrite = (rootElement, jsonObject, arrayMap) => {
    try {
        if (arrayMap) {
            for (const [arrayName, tagName] of Object.entries(arrayMap)) {
                if (Array.isArray(jsonObject[arrayName])) {
                    jsonObject[arrayName] = { [tagName]: jsonObject[arrayName] };
                }
            }
        }
        return (0, js2xmlparser_1.parse)(rootElement, jsonObject, {
            declaration: {
                version: "1.0",
                encoding: "UTF-8"
            }
        });
    }
    catch (error) {
        console.error("\n Error converting to XML:", error);
        throw error;
    }
};
exports.parseWrite = parseWrite;
