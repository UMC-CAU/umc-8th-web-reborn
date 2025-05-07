import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import {
  getAccessToken,
  getRefreshToken,
  removeAuthToken,
  setAuthToken,
} from "../utils/auth";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 싱글톤 인스턴스로 refreshPromise를 관리
let refreshPromise: Promise<string> | null = null;

// axios 인스턴스 생성
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL || "http://localhost:8000",
  timeout: 10000,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomInternalAxiosRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // 401 오류이고 재시도되지 않은 요청인 경우
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      // 재시도 플래그 설정
      originalRequest._retry = true;

      try {
        // 이미 진행 중인 토큰 갱신 요청이 있다면 그 프로미스를 재사용
        if (!refreshPromise) {
          refreshPromise = refreshAccessToken();
        }

        // 갱신된 액세스 토큰 가져오기
        const newAccessToken = await refreshPromise;

        // 헤더 설정
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        // 원래 요청 재시도
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 토큰 갱신 실패 시 로그아웃 처리
        console.error("Token refresh failed:", refreshError);
        removeAuthToken();

        // 로그인 페이지로 리다이렉트
        window.location.href = "/login";

        return Promise.reject(refreshError);
      } finally {
        // 갱신 프로세스 완료 후 refreshPromise 초기화
        refreshPromise = null;
      }
    }

    return Promise.reject(error);
  },
);

// 액세스 토큰 갱신 함수
async function refreshAccessToken(): Promise<string> {
  try {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      throw new Error("Refresh token not found");
    }

    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_API_URL || "http://localhost:8000"}/v1/auth/refresh`,
      { refreshToken },
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    // 새 토큰 저장
    setAuthToken(accessToken, newRefreshToken);

    return accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    removeAuthToken();
    throw error;
  }
}
