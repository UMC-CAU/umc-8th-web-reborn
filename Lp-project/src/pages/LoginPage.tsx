import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore"; // Zustand 스토어 임포트
// import { postSignin } from "../apis/auth"; // postSignin 제거
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SigninFormData, signinSchema } from "../types/auth";
import { FcGoogle } from "react-icons/fc"; // Google 아이콘 추가
// import { toast } from "react-toastify"; // 토스트 메시지를 useAuthStore에서 관리하므로 제거

const LoginPage = () => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, login } = useAuthStore(); // useAuthStore에서 login 액션 가져오기

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  const [error, setError] = useState("");

  // Google 로그인 버튼 클릭 핸들러
  const handleGoogleLogin = () => {
    const serverApiUrl =
      import.meta.env.VITE_SERVER_API_URL || "http://localhost:8000";
    window.location.href = `${serverApiUrl}/v1/auth/google/login`;
  };

  const onSubmit = async (data: SigninFormData) => {
    setError("");

    try {
      await login(data.email, data.password); // useAuthStore의 login 액션 호출
      // navigate는 useEffect에서 처리되므로 여기서는 제거
      // navigate("/", { replace: true });
    } catch (err: any) {
      // useAuthStore의 login 액션에서 이미 오류 처리 및 토스트 메시지 표시를 하므로 여기서는 간단히 로깅만
      console.error("LoginPage - 로그인 onSubmit 처리 중 에러::", err);
    }
  };

  useEffect(() => {
    // isAuthenticated 상태가 true가 되면 (로그인 성공 시)
    if (isAuthenticated) {
      // 토스트 메시지는 useAuthStore의 login 액션에서 이미 처리되었습니다.
      // toast.success("로그인 성공!"); // 여기서는 중복으로 토스트를 띄우지 않도록 제거

      // 홈페이지로 이동
      navigate("/", { replace: true });
    }
    // 의존성 배열에 isAuthenticated와 navigate 추가
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-900 p-10 rounded-lg shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            로그인
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            또는{" "}
            <a
              href="/signup"
              className="font-medium text-red-500 hover:text-red-700"
            >
              회원가입하기
            </a>
          </p>
        </div>
        {error && (
          <div className="rounded-md bg-red-900 bg-opacity-30 p-3 mb-4">
            <div className="text-sm text-red-300">{error}</div>
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                이메일
              </label>
              <input
                {...register("email")}
                type="email"
                autoComplete="email"
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="이메일"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                비밀번호
              </label>
              <input
                {...register("password")}
                type="password"
                autoComplete="current-password"
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="비밀번호"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading} // Zustand 스토어의 isLoading 상태 사용
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-500">
                소셜 계정으로 로그인
              </span>
            </div>
          </div>

          <div className="mt-6">
            {/* Google 로그인 버튼 - 백엔드 인증 흐름에 맞게 수정 */}
            <button
              onClick={handleGoogleLogin}
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-600 text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <FcGoogle className="h-5 w-5 mr-2 text-blue-400" />
              Google 계정으로 로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
