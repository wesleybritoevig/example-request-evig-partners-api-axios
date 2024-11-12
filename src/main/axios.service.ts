import { config } from './env.config';
import axios from "axios";

const api = axios.create({
    baseURL: config.apiUrl,
    headers: {
        'Accept': config.acceptContentType,
        'Content-Type': config.acceptContentType
    }
});

export const postAuth = async (requestBody: string) => {
    try {
        const response = await api.post('api/v1/auth/login', requestBody);
        return response.data;
    } catch (error: any) {
        console.error("\n Error in postProperties:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const postProperties = async (accessToken: string, requestBody: string) => {
    try {
        const response = await api.post('api/v2/properties', requestBody, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error: any) {
        console.error("\n Error in postProperties:", error.response ? error.response.data : error.message);
        throw error;
    }
};
