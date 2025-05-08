import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { AuthContextType, AuthState, LoginResponse, UserDto } from "../types/auth";
import { setAuthToken, removeAuthToken, getAccessToken } from "../utils/auth";
import { getMyInfo } from "../apis/auth";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  // 초기 로드 시 로컬 스토리지에서 토큰 확인
  useEffect(() => {
    const token = getAccessToken();
    
    if (token) {
      // 토큰이 있는 경우 사용자 정보 가져오기
      setAuthState(prev => ({
        ...prev,
        isAuthenticated: true,
        accessToken: token,
      }));
      
      // 사용자 정보 불러오기
      fetchUserInfo();
    }
  }, []);

  // 사용자 정보 가져오기
  const fetchUserInfo = async () => {
    try {
      const response = await getMyInfo();
      setAuthState(prev => ({
        ...prev,
        user: response as unknown as UserDto,
      }));
    } catch (error) {
      console.error("사용자 정보 가져오기 실패:", error);
      logout(); // 오류 발생 시 로그아웃 처리
    }
  };

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
    setAuthState((prev) => ({
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
