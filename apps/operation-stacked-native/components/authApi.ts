// authApi.ts
import { Auth } from '../types';
import { apiRequest } from './apiClient'; // Add this import

export const login = async (email: string, password: string): Promise<Auth> => {
    try {
        const response = await apiRequest('POST', 'auth/login', {
            email,
            password,
        });
        console.log(response)
        const {
            idToken,
            accessToken,
            refreshToken,
            tokenType,
            expiresIn,
            userId,
        } = response;

        const authResponse: Auth = {
            idToken,
            accessToken,
            refreshToken,
            tokenType,
            expiresIn,
            userId,
            success: true
        };

        return authResponse;
    } catch (error) {
        return { success: false } as Auth;
    }
};
