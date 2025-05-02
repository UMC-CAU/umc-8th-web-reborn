import { createContext, useContext, useState, ReactNode } from 'react';
import { AuthContextType, AuthState, LoginResponse } from '../types/auth';
import { setAuthToken, removeAuthToken } from '../utils/auth';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  const login = (response: LoginResponse) => {
    const { accessToken, refreshToken, user } = response;
    setAuthToken(accessToken, refreshToken);
    setAuthState({
      isAuthenticated: true,
      user,
      accessToken,
    });
  };

  const logout = () => {
    removeAuthToken();
    setAuthState(initialState);
  };

  const updateAccessToken = (token: string) => {
    setAuthState(prev => ({
      ...prev,
      accessToken: token,
    }));
  };

  const value = {
    ...authState,
    login,
    logout,
    updateAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


