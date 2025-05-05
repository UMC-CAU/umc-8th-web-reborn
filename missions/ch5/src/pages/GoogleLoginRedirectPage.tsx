import { useEffect } from "react";
import { setAuthToken } from "../utils/auth";
import { LOCAL_STORAGE_KEYS } from "../constants/key.ts";
import { useAuth } from "../context/AuthContext";

const GoogleLoginRedirectPage = () => {
  const { login } = useAuth();

  useEffect(() => {
    const urlParams: URLSearchParams = new URLSearchParams(
      window.location.search,
    );
    const accessToken: string | null = urlParams.get(
      LOCAL_STORAGE_KEYS.ACCESS_TOKEN,
    );
    const refreshToken: string | null = urlParams.get(
      LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
    );

    if (accessToken && refreshToken) {
      // 토큰 저장 및 인증 상태 업데이트
      setAuthToken(accessToken, refreshToken);

      // 사용자 정보가 포함된 경우 처리
      const userInfo = urlParams.get("userInfo");
      if (userInfo) {
        try {
          const user = JSON.parse(decodeURIComponent(userInfo));
          login({
            accessToken,
            refreshToken,
            user,
          });
        } catch (error) {
          console.error("Failed to parse user info:", error);
        }
      } else {
        // 사용자 정보가 없어도 로그인 처리
        login({
          accessToken,
          refreshToken,
          user: null, // 기본 사용자 정보가 없으면 null로 설정
        });
      }

      // 홈페이지로 리다이렉트
      window.location.href = "/";
    } else {
      // 토큰이 없을 경우 로그인 페이지로 이동
      console.error("토큰 정보가 없습니다:", { accessToken, refreshToken });
      window.location.href = "/login";
    }
  }, [login]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">구글 로그인 처리 중...</h1>
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  );
};

export default GoogleLoginRedirectPage;
