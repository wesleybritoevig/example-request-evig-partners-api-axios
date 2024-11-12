# Example Request Evig Partners API

This project demonstrates a simple way to interact with the Evig Partners API using Axios. It shows how to authenticate and send property data using either XML or JSON formats.

## Project Structure

The project has several files to manage environment configuration, XML handling, and Axios requests. Here’s a brief overview of the primary files:

- `main.ts`: The main script for running the authentication and property creation requests.
- `env.config.ts`: Configuration file to load environment variables.
- `xml.helper.ts`: Helper functions for reading, parsing, and writing XML.
- `axios.service.ts`: Service functions using Axios to make API requests.
- `.env`: Environment variables (not included in Git).
- `.env.example`: Template for the required environment variables.
- `input_examples`: Templates for request in xml or json (to place the properties to be sent).

## Prerequisites

- Node.js
- API URL and credentials for the Evig Partners API

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Set the required environment variables in `.env`:
     ```env
     API_URL=https://partners.apis.evig.com.br
     ACCESS_KEY=your_access_key
     SECRET_KEY=your_secret_key
     ACCEPT_CONTENT_TYPE=application/xml # or application/json
     ```
   - Edit your `properties.example` file *(JSON or XML)* in `input_examples` 

3. **Build the Project**:
   ```bash
   npm run build
   ```

4. **Run the Project**:
   ```bash
   npm start
   ```

## How It Works

1. **Authentication**: 
   - The `postAuth` function sends credentials (`accessKey`, `secretKey`) to the `/api/v1/auth/login` endpoint.
   - The response includes an `accessToken` used for subsequent requests.

2. **Property Creation**:
   - With a valid `accessToken`, the `postProperties` function sends property data to the `/api/v2/properties` endpoint.
   - Property data is sent in XML or JSON format based on the `ACCEPT_CONTENT_TYPE` environment variable.

## Code Overview

### main.ts

The main script handles authentication and property creation using either XML or JSON. Depending on the content type (`application/xml` or `application/json`), the script performs the following:

1. Authenticates and retrieves an `accessToken`.
2. Reads property data from `properties.example.xml` (if XML) or `properties.example.json` (if JSON).
3. Sends the property data with the `accessToken` to the Evig Partners API.

### Example Usage in `main.ts`

```typescript
import { postAuth, postProperties } from "./axios.service";
import { config } from './env.config';
import { parseRead, parseWrite, readXmlFile } from "./xml.helper";

const currentContentType = config.acceptContentType;
const credentialsJson = { accessKey: config.accessKey, secretKey: config.secretKey };
const credentialsXML = parseWrite("credentials", credentialsJson);
const propertiesJson = require("../../input_examples/properties.example.json");
const propertiesXMLPath = "./input_examples/properties.example.xml";

async function main() {
    try {
        if (currentContentType === "application/xml") {
            const authData = await postAuth(credentialsXML);
            const parsedData = await parseRead(authData);
            const accessToken = parsedData?.MessageData?.data[0]?.accessToken[0];

            if (accessToken) {
                const propertiesXML = await readXmlFile(propertiesXMLPath);
                const propertiesResponse = await postProperties(accessToken, propertiesXML);
                console.log("\nProperty creation response:", propertiesResponse);
            }
        } else {
            const authData = await postAuth(JSON.stringify(credentialsJson));
            const accessToken = authData?.data?.accessToken;

            if (accessToken) {
                const propertiesResponse = await postProperties(accessToken, JSON.stringify(propertiesJson));
                console.log("\nProperty creation response:", propertiesResponse);
            }
        }
    } catch (error: any) {
        console.error("\nError:", error.response ? error.response.data : error.message);
    }
}

main();
```

## Sample CURL Requests

### Authentication Request (Login)

**XML**
```sh
curl -X 'POST' \
'https://partners.apis.evig.com.br/api/v1/auth/login' \
-H 'accept: application/xml' \
-H 'Content-Type: application/xml' \
-d '<?xml version="1.0" encoding="UTF-8"?>
<AuthRequestLogin>
    <accessKey>your_access_key</accessKey>
    <secretKey>your_secret_key</secretKey>
</AuthRequestLogin>'
```

**JSON**
```sh
curl -X 'POST' \
'https://partners.apis.evig.com.br/api/v1/auth/login' \
-H 'accept: application/json' \
-H 'Content-Type: application/json' \
-d '{
    "accessKey": "your_access_key",
    "secretKey": "your_secret_key"
}'
```

### Property Creation Request

With the acquired `accessToken`, you can make a request to create a property.

**XML**
```sh
curl -X 'POST' \
'https://partners.apis.evig.com.br/api/v2/properties' \
-H 'accept: application/xml' \
-H 'Content-Type: application/xml' \
-H 'Authorization: Bearer {accessToken}' \
-d '<?xml version="1.0" encoding="UTF-8"?>
<PropertyCreate>
    <properties>
        <Property>
            <partnerPropertyId>id_example0</partnerPropertyId>
            <partnerPropertyUrl>https://example.com/properties/id_example</partnerPropertyUrl>
            <imageUrl>https://example.com/image.jpg</imageUrl>
            <types>
                <propertyType>APARTMENT</propertyType>
                <subTypeHouse>DEFAULT</subTypeHouse>
                <subTypeApartment>DEFAULT</subTypeApartment>
            </types>
            <price>500000.00</price>
            <address>
                <state>SP</state>
                <city>Sao Paulo</city>
                <neighborhood>Pinheiros</neighborhood>
                <street>Rua Example</street>
            </address>
            <coordinate>
                <latitude>-23.000</latitude>
                <longitude>-46.000</longitude>
            </coordinate>
            <condominiumFee>250.00</condominiumFee>
            <iptuPrice>100.00</iptuPrice>
            <utilArea>100</utilArea>
            <bedrooms>3</bedrooms>
            <bathrooms>2</bathrooms>
            <suites>1</suites>
            <parking>2</parking>
        </Property>
        <Property>
            <partnerPropertyId>id_example1</partnerPropertyId>
            <partnerPropertyUrl>https://example.com/properties/id_example</partnerPropertyUrl>
            <imageUrl>https://example.com/image.jpg</imageUrl>
            <types>
                <propertyType>HOUSE</propertyType>
                <subTypeHouse>DEFAULT</subTypeHouse>
                <subTypeApartment>DEFAULT</subTypeApartment>
            </types>
            <price>500000.00</price>
            <address>
                <state>SP</state>
                <city>Sao Paulo</city>
                <neighborhood>Pinheiros</neighborhood>
                <street>Rua Example</street>
            </address>
            <coordinate>
                <latitude>-23.000</latitude>
                <longitude>-46.000</longitude>
            </coordinate>
            <condominiumFee>null</condominiumFee>
            <iptuPrice>100.00</iptuPrice>
            <utilArea>100</utilArea>
            <bedrooms>3</bedrooms>
            <bathrooms>2</bathrooms>
            <suites>1</suites>
            <parking>2</parking>
        </Property>
        <Property>
            <partnerPropertyId>id_example2</partnerPropertyId>
            <partnerPropertyUrl>https://example.com/properties/id_example</partnerPropertyUrl>
            <imageUrl>https://example.com/image.jpg</imageUrl>
            <types>
                <propertyType>HOUSE</propertyType>
                <subTypeHouse>CONDOMINIUM</subTypeHouse>
                <subTypeApartment>DEFAULT</subTypeApartment>
            </types>
            <price>500000.00</price>
            <address>
                <state>SP</state>
                <city>Sao Paulo</city>
                <neighborhood>Pinheiros</neighborhood>
                <street>Rua Example</street>
            </address>
            <coordinate>
                <latitude>-23.000</latitude>
                <longitude>-46.000</longitude>
            </coordinate>
            <condominiumFee>250.00</condominiumFee>
            <iptuPrice>100.00</iptuPrice>
            <utilArea>100</utilArea>
            <bedrooms>3</bedrooms>
            <bathrooms>2</bathrooms>
            <suites>1</suites>
            <parking>2</parking>
        </Property>
    </properties>
</PropertyCreate>'
```

**JSON**
```sh
curl -X 'POST' \
'https://partners.apis.evig.com.br/api/v2/properties' \
-H 'accept: application/json' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer {accessToken}' \
-d '{
    "properties": [
        {
            "partnerPropertyId": "id_example0",
            "partnerPropertyUrl": "https://example.com/properties/id_example",
            "imageUrl": "https://example.com/image.jpg",
            "types": {
                "propertyType": "APARTMENT",
                "subTypeHouse": "DEFAULT",
                "subTypeApartment": "DEFAULT"
            },
            "price": 500000.00,
            "address": {
                "state": "SP",
                "city": "Sao Paulo",
                "neighborhood": "Pinheiros",
                "street": "Rua Example"
            },
            "coordinate": {
                "latitude": "-23.000",
                "longitude": "-46.000"
            },
            "condominiumFee": 250.00,
            "iptuPrice": 100.00,
            "utilArea": 100,
            "bedrooms": 3,
            "bathrooms": 2,
            "suites": 1,
            "parking": 2
        },
         {
            "partnerPropertyId": "id_example1",
            "partnerPropertyUrl": "https://example.com/properties/id_example",
            "imageUrl": "https://example.com/image.jpg",
            "types": {
                "propertyType": "HOUSE",
                "subTypeHouse": "DEFAULT",
                "subTypeApartment": "DEFAULT"
            },
            "price": 500000.00,
            "address": {
                "state": "SP",
                "city": "Sao Paulo",
                "neighborhood": "Pinheiros",
                "street": "Rua Example"
            },
            "coordinate": {
                "latitude": "-23.000",
                "longitude": "-46.000"
            },
            "condominiumFee": null,
            "iptuPrice": 100.00,
            "utilArea": 100,
            "bedrooms": 3,
            "bathrooms": 2,
            "suites": 1,
            "parking": 2
        },
         {
            "partnerPropertyId": "id_example2",
            "partnerPropertyUrl": "https://example.com/properties/id_example",
            "imageUrl": "https://example.com/image.jpg",
            "types": {
                "propertyType": "HOUSE",
                "subTypeHouse": "CONDOMINIUM",
                "subTypeApartment": "DEFAULT"
            },
            "price": 500000.00,
            "address": {
                "state": "SP",
                "city": "Sao Paulo",
                "neighborhood": "Pinheiros",
                "street": "Rua Example"
            },
            "coordinate": {
                "latitude": "-23.000",
                "longitude": "-46.000"
            },
            "condominiumFee": 250.00,
            "iptuPrice": 100.00,
            "utilArea": 100,
            "bedrooms": 3,
            "bathrooms": 2,
            "suites": 1,
            "parking": 2
        }
    ]
}'
```
