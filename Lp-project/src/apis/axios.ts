import axios, { type InternalAxiosRequestConfig, type AxiosError } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key"; // LOCAL_STORAGE_KEY 임포트
import { useAuthStore } from "../store/authStore"; // useAuthStore 임포트
import { refreshAccessToken } from "./auth"; // refreshAccessToken 임포트

// axios 인스턴스 생성
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL || "http://localhost:8000",
  timeout: 10000,
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터 추가
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // 액세스 토큰 만료 (401 에러) 및 토큰 갱신 시도 중이 아닌 경우
    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest &&
      !(originalRequest as any)._retry
    ) {
      (originalRequest as any)._retry = true;

      try {
        // 리프레시 토큰을 사용하여 새로운 액세스 토큰 발급
        const refreshResponse = await refreshAccessToken();
        const newAccessToken = refreshResponse.data.accessToken;
        const newRefreshToken = refreshResponse.data.refreshToken; // 리프레시 토큰도 갱신될 경우

        // Zustand 스토어 업데이트
        useAuthStore.getState().setTokens(newAccessToken, newRefreshToken);

        // 새로운 액세스 토큰으로 원래 요청의 헤더 업데이트
        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // 실패했던 원래 요청 재시도
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 토큰 갱신 실패 시 로그인 페이지로 리다이렉트 또는 로그아웃 처리
        console.error("Failed to refresh access token:", refreshError);
        useAuthStore.getState().clearAuth(); // 인증 정보 초기화
        // TODO: 로그인 페이지로 리다이렉트 로직 추가 (React Router)
        return Promise.reject(refreshError);
      }
    }

    // 401 에러가 아니거나 이미 재시도한 경우 오류 반환
    return Promise.reject(error);
  },
);
