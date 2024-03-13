import axios, { AxiosRequestConfig, Method } from 'axios';
import { store } from '../store/slices/store';

const apiClient = axios.create();

export const  apiRequest = async (
    method: Method,
    url: string,
    data?: any,
    headers: any = {}
) => {
    const token = store.getState().auth.accessToken;

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const config: AxiosRequestConfig = {
        method,
        baseURL: `https://app.operationstacked.com/${url}/`, // set baseURL here dynamically
        data,
        headers,
    };
    try {
        const response = await apiClient(config);
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
};
