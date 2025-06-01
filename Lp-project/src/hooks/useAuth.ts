import { useEffect } from "react";
import { useAuthStore } from "../store/authStore"; // Zustand 스토어 임포트

export const useAuth = () => {
  // Zustand 스토어에서 상태와 액션 가져오기
  const {
    isAuthenticated,
    isLoading,
    user,
    login,
    loginWithGoogle,
    signout,
    fetchUser,
  } = useAuthStore();

  // 컴포넌트 마운트 시 사용자 정보 fetch (Zustand 스토어의 초기 로딩과 연계)
  useEffect(() => {
    fetchUser();
  }, [fetchUser]); // fetchUser 함수는 스토어에서 가져오므로 의존성 배열에 포함

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    loginWithGoogle,
    signout,
  };
};
