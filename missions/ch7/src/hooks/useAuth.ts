import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  postSignin,
  getMyInfo,
  postLogout,
  postGoogleLogin,
} from "../apis/auth";
import { useLocalStorage } from "./useLocalStorage";
import { LOCAL_STORAGE_KEYS } from "../constants/key";
import { RequestLoginDto } from "../types/auth";
import Cookies from "js-cookie";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useLocalStorage(
    LOCAL_STORAGE_KEYS.ACCESS_TOKEN,
    "",
  );
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (accessToken) {
        try {
          await getMyInfo();
          setIsAuthenticated(true);
        } catch {
          setAccessToken("");
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [accessToken, setAccessToken]);

  const login = async (loginData: RequestLoginDto) => {
    const response = await postSignin(loginData);
    const { accessToken: newAccessToken, refreshToken } = response.data;

    // Access Token은 localStorage에 저장
    setAccessToken(newAccessToken);

    // Refresh Token은 httpOnly 쿠키로 저장
    Cookies.set("refreshToken", refreshToken, {
      expires: 14, // 14일
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    setIsAuthenticated(true);
    navigate("/home");
  };

  const loginWithGoogle = async (googleAccessToken: string) => {
    try {
      const response = await postGoogleLogin(googleAccessToken);
      const { accessToken: newAccessToken, refreshToken } = response.data;

      // Access Token은 localStorage에 저장
      setAccessToken(newAccessToken);

      // Refresh Token은 httpOnly 쿠키로 저장
      Cookies.set("refreshToken", refreshToken, {
        expires: 14, // 14일
        secure: true,
        sameSite: "strict",
        path: "/",
      });

      setIsAuthenticated(true);
      navigate("/home");
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const logout = async () => {
    try {
      await postLogout();
      setAccessToken("");
      Cookies.remove("refreshToken");
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // 에러가 발생해도 로컬의 인증 정보는 삭제
      setAccessToken("");
      Cookies.remove("refreshToken");
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    loginWithGoogle,
    logout,
  };
};
