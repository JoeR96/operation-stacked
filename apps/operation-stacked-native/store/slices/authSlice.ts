import { createSlice } from '@reduxjs/toolkit';
import { Auth } from '../../types';

interface AuthState extends Auth {
    userId: string;
}

const initialState: AuthState = {
    idToken: '',
    accessToken: '',
    refreshToken: '',
    tokenType: '',
    expiresIn: 0,
    userId: '',
    success: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthData: (state, action: { payload: Auth }) => {
            state.idToken = action.payload.idToken;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.tokenType = action.payload.tokenType;
            state.expiresIn = action.payload.expiresIn;
            state.userId = action.payload.userId;
        }
    },
});

// Selector to get userId from the state
export const selectUserId = (state) => state.auth.userId;

export const { setAuthData } = authSlice.actions;

export default authSlice.reducer;
