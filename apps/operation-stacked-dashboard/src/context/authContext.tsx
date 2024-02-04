import React, { createContext, ReactNode, useContext } from 'react';
import { AuthApi } from '@operation-stacked/shared-services';

const AuthApiContext = createContext<AuthApi>(new AuthApi());

interface AuthApiProviderProps {
  authApi: AuthApi;
  children: ReactNode;
}

// Implement the AuthApiProvider component with typed props
export const AuthApiProvider: React.FC<AuthApiProviderProps> = ({ authApi, children }) => (
  <AuthApiContext.Provider value={authApi}>{children}</AuthApiContext.Provider>
);


// Custom hook to use the authApi
export const useAuthApi = () => {
  const context = useContext(AuthApiContext);
  if (context === null) {
    throw new Error('useAuthApi must be used within a AuthApiProvider');
  }
  return context;
};
