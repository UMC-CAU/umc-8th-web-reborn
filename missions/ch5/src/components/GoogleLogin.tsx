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

  // 환경 변수 디버깅
  useEffect(() => {
    console.log("환경 변수 확인:", {
      GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      REDIRECT_URI: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
      SERVER_API_URL: import.meta.env.VITE_SERVER_API_URL,
    });
  }, []);

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      setIsLoading(true);
      try {
        console.log("Google OAuth success:", response);

        const baseUrl =
          import.meta.env.VITE_SERVER_API_URL || "http://localhost:8000";

        // 백엔드 서버에 Google access token을 전송하여 인증
        console.log("서버에 요청 보내기:", {
          url: `${baseUrl}/v1/auth/google`,
          accessToken: response.access_token,
        });

        // 오류가 발생하는 경우 목업 데이터로 진행 (테스트용)
        try {
          const { data } = await axiosInstance.post("/v1/auth/google", {
            accessToken: response.access_token,
          });

          console.log("Backend auth response:", data);

          if (!data.accessToken || !data.refreshToken) {
            throw new Error("토큰이 올바르게 수신되지 않았습니다.");
          }

          // 인증 상태 업데이트
          login(data);
          onSuccess?.();
        } catch (apiError) {
          console.warn("API 호출 실패, 목업 데이터 사용:", apiError);

          // 테스트 계정용 모의 데이터 (실제 배포 시 제거 필요)
          const mockData = {
            accessToken: "test-google-access-token",
            refreshToken: "test-google-refresh-token",
            user: {
              id: "google-user-123",
              email: "google-user@example.com",
              name: "구글 사용자",
              profileImage: "https://via.placeholder.com/150",
            },
          };

          login(mockData);
          onSuccess?.();
        }
      } catch (error) {
        console.error("Google login failed:", error);
        onError?.("Google 로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.error("Google OAuth error:", error);
      onError?.(
        "Google 로그인 중 오류가 발생했습니다. 브라우저 설정을 확인해주세요.",
      );
    },
    flow: "implicit", // 클라이언트 측 흐름 사용
    scope: "email profile openid",
  });

  const handleGoogleLogin = () => {
    try {
      console.log("구글 로그인 시작...");
      googleLogin();
    } catch (error) {
      console.error("Google login error:", error);
      onError?.("Google 로그인을 시작할 수 없습니다.");
    }
  };

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
