// themeReducer.ts
import { createSlice } from '@reduxjs/toolkit';

export interface ThemeState {
    theme: {
        background: string;
        text: string;
        cardBackground: string;
        button: string;
        buttonText: string;
        inputBackground: string;
        placeholderTextColor: string;
        primary: string;
        secondary: string;
        buttonBackground: string;
        inputBorder: string;
    };
}

const lightTheme = {
    background: '#F2F2F2',
    text: '#333333',
    cardBackground: '#FFFFFF',
    button: '#0D6EFD',
    buttonText: '#FFFFFF',
    inputBackground: '#E0E0E0',
    placeholderTextColor: '#8E8E93',
    primary: '#32CD32', // Lime Green
    secondary: '#FFA07A', // Light Salmon
    buttonBackground: '#0D6EFD', // Button Blue
    inputBorder: '#CCCCCC'
};

const darkTheme = {
    background: "#1F1F1F",
    text: "#E0E0E0",
    cardBackground: "#2C2C2C",
    button: "#ff8c00",
    buttonText: "#FFFFFF",
    inputBackground: "#3D3D3D",
    placeholderTextColor: "#8E8E93",
    primary: "#32CD32", // Lime Green
    secondary: "#FFA07A", // Light Salmon
    buttonBackground: "##ff8c00", // Button Blue
    inputBorder: '#666666'
};



const initialState: ThemeState = {
    theme: darkTheme,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme.background === lightTheme.background ? darkTheme : lightTheme;
        },
    },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
