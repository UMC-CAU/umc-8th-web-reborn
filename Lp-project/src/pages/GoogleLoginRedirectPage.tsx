import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";
// useLocalStorage 훅은 더 이상 필요 없습니다.
import { useNavigate } from "react-router-dom";

const GoogleLoginRedirectPage = () => {
  // useAuthStore에서 setTokens와 fetchUser 액션을 가져옵니다.
  const { setTokens, fetchUser } = useAuthStore();
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const processGoogleLogin = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken); // 실제 파라미터 이름 확인
      const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken); // 실제 파라미터 이름 확인

      console.log("구글 로그인 리디렉트: URL 파라미터", {
        accessToken,
        refreshToken,
      });

      // accessToken과 refreshToken이 모두 존재하는 경우에만 토큰 설정 및 리다이렉트
      if (accessToken && refreshToken) {
        // useAuthStore의 setTokens 액션을 호출하여 토큰을 설정합니다.
        setTokens(accessToken, refreshToken);
        console.log("토큰 설정 완료. 사용자 정보 가져오기 시도...");
        try {
          await fetchUser(); // 사용자 정보 가져오기
          console.log("사용자 정보 가져오기 성공!");
        } catch (error) {
          console.error("사용자 정보 가져오기 실패:", error);
        }
        // URL 파라미터 제거 및 메인 페이지로 이동
        navigate("/", { replace: true }); // 홈 화면으로 이동
        console.log("구글 로그인 처리 완료: 성공");
      } else {
        console.error("구글 로그인 실패: 토큰이 URL 파라미터에 없습니다.");
        console.log("구글 로그인 처리 완료: 실패 (토큰 없음)");
      }
    };

    processGoogleLogin();
  }, [setTokens, fetchUser, navigate]); // 의존성 배열에 fetchUser와 navigate 포함

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      구글 로그인 리다이렉트 화면
    </div>
  );
};

export default GoogleLoginRedirectPage;
