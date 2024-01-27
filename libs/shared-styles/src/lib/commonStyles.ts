import { theme } from './theme';

export const globalStyles = {
  body: {
    backgroundColor: theme.colors.background,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    color: theme.colors.text,
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    minHeight: '100vh',
  }
};

export const commonStyles = {
  button: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    fontWeight: 400,
  },
  text: {
    color: theme.colors.text,
  },
};
