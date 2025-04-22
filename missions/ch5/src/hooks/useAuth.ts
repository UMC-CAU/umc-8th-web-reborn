import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postSignin, getMyInfo } from '../apis/auth';
import { useLocalStorage } from './useLocalStorage';
import { LocalStorageKey } from '../constants/key';
import { RequestLoginDto } from '../types/auth';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useLocalStorage(LocalStorageKey.ACCESS_TOKEN, '');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (accessToken) {
        try {
          await getMyInfo();
          setIsAuthenticated(true);
        } catch (error) {
          setAccessToken('');
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [accessToken, setAccessToken]);

  const login = async (loginData: RequestLoginDto) => {
    try {
      const response = await postSignin(loginData);
      setAccessToken(response.data.accessToken);
      setIsAuthenticated(true);
      navigate('/home');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setAccessToken('');
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
}; 