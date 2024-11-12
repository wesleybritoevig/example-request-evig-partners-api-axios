import dotenv from 'dotenv';
dotenv.config();

export const config = {
    apiUrl: process.env.API_URL ?? '',
    accessKey: process.env.ACCESS_KEY ?? '',
    secretKey: process.env.SECRET_KEY ?? '',
    acceptContentType: process.env.ACCEPT_CONTENT_TYPE ?? ''
};

if (!config.apiUrl || !config.accessKey || !config.secretKey || !config.acceptContentType) {
    throw new Error("Missing required environment variables in .env file");
}
