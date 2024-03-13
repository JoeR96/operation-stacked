import { createContext, useContext, useState } from 'react';

export interface Theme {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    inputBackground: string;
    placeholderTextColor: string;
}

export const themes: { [key: string]: Theme } = {
    light: {
        background: '#fff',
        text: '#000',
        primary: '#ff7f50',
        secondary: '#999',
        inputBackground: '#f0f0f0',
        placeholderTextColor: '#666',
    },
    dark: {
        background: '#222',
        text: '#fff',
        primary: '#ff7f50',
        secondary: '#999',
        inputBackground: '#444',
        placeholderTextColor: '#999',
    },
};

interface ThemeContextProps {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

export const ThemeContext = createContext<ThemeContextProps>({
    theme: themes.light,
    setTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);
