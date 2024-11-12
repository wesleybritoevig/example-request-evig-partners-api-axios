import { promises as fs } from "fs";
import { parse } from "js2xmlparser";
import { parseStringPromise } from "xml2js";

export const readXmlFile = async (filePath: string): Promise<string> => {
    try {
        const xmlData = await fs.readFile(filePath, "utf-8");
        return xmlData;
    } catch (error) {
        console.error("\nError reading XML file:", error);
        throw error;
    }
};

export const parseRead = async (xmlData: string): Promise<any> => {
    try {
        const parsedData = await parseStringPromise(xmlData);
        return parsedData;
    } catch (error) {
        console.error("\n Error parsing XML:", error);
        throw error;
    }
};

export const parseWrite = (rootElement: string, jsonObject: any, arrayMap?: { [key: string]: string }): string => {
    try {
        if (arrayMap) {
            for (const [arrayName, tagName] of Object.entries(arrayMap)) {
                if (Array.isArray(jsonObject[arrayName])) {
                    jsonObject[arrayName] = { [tagName]: jsonObject[arrayName] };
                }
            }
        }
        return parse(rootElement, jsonObject, {
            declaration: {
                version: "1.0",
                encoding: "UTF-8"
            }
        });
    } catch (error) {
        console.error("\n Error converting to XML:", error);
        throw error;
    }
};
