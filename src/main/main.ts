import { postAuth, postProperties } from "./axios.service";
import { config } from './env.config';
import { parseRead, parseWrite, readXmlFile } from "./xml.helper";

const currentContentType = config.acceptContentType;
const credentialsJson = {
    accessKey: config.accessKey,
    secretKey: config.secretKey
}
const credentialsXML = parseWrite("credentials", credentialsJson);
const propertiesJson = require("../../input_examples/properties.example.json")
const propertiesXMLPath = "./input_examples/properties.example.xml";

async function main() {
    try {
        if ("application/xml" === currentContentType) {
            console.log("\n Using XML as content type");
            const authData = await postAuth(credentialsXML);
            console.log("\n Auth Response:", authData);
            const parsedData = await parseRead(authData);
            const accessToken = parsedData?.MessageData?.data[0]?.accessToken[0];
            console.log("\n Access Token:", accessToken);
            if (accessToken) {
                const propertiesXML = await readXmlFile(propertiesXMLPath);
                const propertiesResponse = await postProperties(accessToken, propertiesXML);
                console.log("\n Property creation response:", propertiesResponse);
            }
        } else {
            console.log("\n Using JSON as content type");
            const authData = await postAuth(JSON.stringify(credentialsJson));
            console.log("\n Auth Response:", authData);
            const accessToken = authData?.data?.accessToken;
            console.log("\n Access Token:", accessToken);
            if (accessToken) {
                const propertiesResponse = await postProperties(accessToken, JSON.stringify(propertiesJson));
                console.log("\n Property creation response:", propertiesResponse);
            }
        }
    } catch (error: any) {
        console.error("\n Error:", error.response ? error.response.data : error.message);
    }
}

main();
