import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import {
  type UserDto,
  type ApiResponseWrapper,
  type LoginData,
} from "../types/auth";
import {
  getMyInfo,
  postSignout,
  postSignin,
  postGoogleLogin,
} from "../apis/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserDto | null;
  isAuthenticated: boolean;
  isLoading: boolean; // 로딩 상태 추가
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (googleAccessToken: string) => Promise<void>;
  signout: () => Promise<void>;
  fetchUser: () => Promise<void>; // 사용자 정보 가져오는 액션
  setTokens: (accessToken: string, refreshToken: string) => void; // 토큰 설정 액션
  clearAuth: () => void; // 인증 정보 초기화 액션
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        // 초기 상태
        accessToken: null, // persist 미들웨어가 로컬 스토리지에서 로드하도록 함
        refreshToken: Cookies.get(LOCAL_STORAGE_KEY.refreshToken) || null, // 쿠키에서 refreshToken 가져옴
        user: null,
        isAuthenticated: false, // 초기 상태
        isLoading: false,

        // Actions
        setTokens: (accessToken, refreshToken) => {
          localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, accessToken);
          Cookies.set(LOCAL_STORAGE_KEY.refreshToken, refreshToken, {
            expires: 7,
            secure: import.meta.env.PROD,
            sameSite: "strict",
          });
          set({ accessToken, refreshToken, isAuthenticated: true });
        },

        clearAuth: () => {
          localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
          Cookies.remove(LOCAL_STORAGE_KEY.refreshToken);
          set({
            accessToken: null,
            refreshToken: null,
            user: null,
            isAuthenticated: false,
          });
        },

        login: async (email, password) => {
          set({ isLoading: true });
          try {
            const response: ApiResponseWrapper<LoginData> = await postSignin({
              email,
              password,
            });
            if (response.data) {
              console.log("Login success response data:", response.data); // 응답 데이터 로깅
              get().setTokens(
                response.data.accessToken,
                response.data.refreshToken,
              );
              console.log(
                "AuthStore: accessToken state after setTokens:",
                get().accessToken,
              );
              await get().fetchUser(); // 로그인 성공 후 사용자 정보 가져오기
              toast.success("로그인 성공!");
            }
          } catch (error) {
            console.error("로그인 실패:", error);
            get().clearAuth();
            toast.error(
              "로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.",
            );
            throw error; // 에러 다시 던져서 호출하는 곳에서 처리할 수 있도록 함
          } finally {
            set({ isLoading: false });
          }
        },

        loginWithGoogle: async (googleAccessToken) => {
          set({ isLoading: true });
          try {
            const response: ApiResponseWrapper<LoginData> =
              await postGoogleLogin(googleAccessToken);
            if (response.data) {
              console.log("Google Login success response data:", response.data); // 응답 데이터 로깅
              get().setTokens(
                response.data.accessToken,
                response.data.refreshToken,
              );
              console.log(
                "AuthStore: accessToken state after setTokens (Google):",
                get().accessToken,
              );
              await get().fetchUser(); // 로그인 성공 후 사용자 정보 가져오기
              toast.success("Google 로그인 성공!");
            }
          } catch (error) {
            console.error("Google 로그인 실패:", error);
            get().clearAuth();
            toast.error("Google 로그인에 실패했습니다.");
            throw error; // 에러 다시 던져서 호출하는 곳에서 처리할 수 있도록 함
          } finally {
            set({ isLoading: false });
          }
        },

        signout: async () => {
          set({ isLoading: true });
          try {
            await postSignout();
            toast.success("로그아웃 되었습니다.");
          } catch (error) {
            console.error("로그아웃 실패 (백엔드):", error);
            // 백엔드 로그아웃 실패 시에도 클라이언트 상태는 초기화
            toast.error("로그아웃 중 오류가 발생했습니다.");
          } finally {
            get().clearAuth();
            set({ isLoading: false });
          }
        },

        fetchUser: async () => {
          const currentAccessToken = get().accessToken;
          console.log(
            "fetchUser - 현재 accessToken:",
            currentAccessToken
              ? currentAccessToken.substring(0, 10) + "..."
              : null,
          ); // accessToken 값 로깅

          if (!currentAccessToken) {
            // 액세스 토큰이 없으면 사용자 정보 및 인증 상태 초기화
            set({ user: null, isAuthenticated: false });
            return;
          }

          set({ isLoading: true });
          try {
            const response = await getMyInfo();
            if (response.data) {
              set({ user: response.data, isAuthenticated: true }); // 사용자 정보 로드 성공 시 isAuthenticated true 설정
            } else {
              // 사용자 정보가 없으면 인증 상태 초기화
              get().clearAuth();
              toast.error(
                "사용자 정보를 불러오는데 실패했습니다. 다시 로그인 해주세요.",
              ); // 사용자 정보 로딩 실패 메시지
            }
          } catch (error: any) {
            console.error("사용자 정보 로딩 실패:", error);
            // 오류 발생 시 인증 상태 초기화 (토큰 만료 등)
            get().clearAuth();
            // 에러 메시지에 따라 사용자에게 더 구체적인 피드백 제공
            if (error.response && error.response.status === 401) {
              toast.error("인증 정보가 만료되었습니다. 다시 로그인 해주세요.");
            } else {
              toast.error("사용자 정보를 불러오는데 실패했습니다.");
            }
          } finally {
            set({ isLoading: false });
          }
        },
      }),
      {
        name: "auth-storage", // 로컬 스토리지 키
        storage: createJSONStorage(() => localStorage),
      },
    ),
    { name: "AuthStore" },
  ),
);
