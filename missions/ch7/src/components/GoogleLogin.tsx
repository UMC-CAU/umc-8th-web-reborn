import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import { axiosInstance } from "../apis/axios";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";

interface GoogleLoginProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const GoogleLogin = ({ onSuccess, onError }: GoogleLoginProps) => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [envCheckCompleted, setEnvCheckCompleted] = useState(false);
  const [envError, setEnvError] = useState<string | null>(null);

  // 환경 변수 디버깅 - 컴포넌트 마운트 시 실행
  useEffect(() => {
    console.log("GoogleLogin 컴포넌트 마운트");
    
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
    const serverApiUrl = import.meta.env.VITE_SERVER_API_URL;
    
    console.log("환경 변수 확인:", {
      GOOGLE_CLIENT_ID: googleClientId ? googleClientId.substring(0, 5) + "..." : "설정되지 않음",
      REDIRECT_URI: redirectUri || "설정되지 않음",
      SERVER_API_URL: serverApiUrl || "설정되지 않음",
    });
    
    // 필수 환경 변수 체크
    if (!googleClientId) {
      const errorMsg = "Google Client ID가 설정되지 않았습니다. 관리자에게 문의하세요.";
      console.error(errorMsg);
      setEnvError(errorMsg);
    }
    
    setEnvCheckCompleted(true);
  }, []);

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      setIsLoading(true);
      try {
        console.log("Google OAuth 성공:", response);

        // 백엔드 API 호출 전 로그
        console.log("백엔드 API 호출:", {
          url: "/v1/auth/google/login",
          accessToken: response.access_token ? response.access_token.substring(0, 5) + "..." : "없음"
        });

        const { data } = await axiosInstance.post("/v1/auth/google/login", {
          accessToken: response.access_token,
        });

        console.log("백엔드 인증 응답:", {
          status: "성공",
          hasAccessToken: !!data.accessToken,
          hasRefreshToken: !!data.refreshToken,
          data: data
        });

        if (!data.accessToken || !data.refreshToken) {
          throw new Error("토큰이 올바르게 수신되지 않았습니다.");
        }

        // 인증 상태 업데이트
        login(data);
        onSuccess?.();
      } catch (error) {
        console.error("Google 로그인 실패:", error);
        onError?.("Google 로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.error("Google OAuth 오류:", error);
      onError?.(
        "Google 로그인 중 오류가 발생했습니다. 브라우저 설정을 확인해주세요.",
      );
    },
    flow: "implicit", // 클라이언트 측 흐름 사용
    scope: "email profile openid",
  });

  const handleGoogleLogin = () => {
    try {
      if (envError) {
        onError?.(envError);
        return;
      }
      
      console.log("구글 로그인 시작...");
      googleLogin();
    } catch (error) {
      console.error("Google 로그인 오류:", error);
      onError?.("Google 로그인을 시작할 수 없습니다.");
    }
  };

  if (!envCheckCompleted) {
    return (
      <button
        disabled
        className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-400 transition-colors"
        type="button"
      >
        <span>Google 로그인 준비 중...</span>
      </button>
    );
  }
  
  if (envError) {
    return (
      <button
        onClick={() => onError?.(envError)}
        className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        type="button"
      >
        <FcGoogle className="text-xl" />
        <span>Google 설정 오류</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      type="button"
    >
      {isLoading ? (
        <span>로딩 중...</span>
      ) : (
        <>
          <FcGoogle className="text-xl" />
          <span>Google로 계속하기</span>
        </>
      )}
    </button>
  );
};
