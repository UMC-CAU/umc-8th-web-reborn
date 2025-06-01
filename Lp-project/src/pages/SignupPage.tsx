import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { signupSchema, type SignupFormData } from "../types/auth";
import { postSignup } from "../apis/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

const SignupPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      bio: "",
      avatar: "",
    },
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    // bio, avatar 정보도 함께 전송
    const { email, password, name, bio, avatar } = data;

    try {
      const response = await postSignup({ email, password, name, bio, avatar });
      console.log("회원가입 응답:", response);
      toast.success("회원가입 성공! 로그인 해주세요.");
      navigate("/login");
    } catch (error) {
      console.error("회원가입 실패:", error);
      toast.error("회원가입 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("이미 로그인되어 있습니다.");
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Google 로그인 버튼 클릭 핸들러
  const handleGoogleLogin = () => {
    const serverApiUrl =
      import.meta.env.VITE_SERVER_API_URL || "http://localhost:8000";
    window.location.href = `${serverApiUrl}/v1/auth/google/login`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-900 p-10 rounded-lg shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            회원가입
          </h2>
          <p className="mt-2 text-center text-base text-gray-400">
            또는{" "}
            <a
              href="/login"
              className="font-medium text-red-500 hover:text-red-700"
            >
              로그인하기
            </a>
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                이름
              </label>
              <input
                {...register("name")}
                type="text"
                className={`appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${errors.name ? "border-red-500" : ""}`}
                placeholder="이름"
              />
              {errors.name && (
                <span className="mt-1 text-sm text-red-400">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                이메일
              </label>
              <input
                {...register("email")}
                type="email"
                autoComplete="email"
                className={`appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${errors.email ? "border-red-500" : ""}`}
                placeholder="이메일"
              />
              {errors?.email && (
                <span className="mt-1 text-sm text-red-400">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                비밀번호
              </label>
              <input
                {...register("password")}
                type="password"
                autoComplete="new-password"
                className={`appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${errors.password ? "border-red-500" : ""}`}
                placeholder="비밀번호"
              />
              {errors?.password && (
                <span className="mt-1 text-sm text-red-400">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                비밀번호 확인
              </label>
              <input
                {...register("confirmPassword")}
                type="password"
                autoComplete="new-password"
                className={`appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${errors.confirmPassword ? "border-red-500" : ""}`}
                placeholder="비밀번호 확인"
              />
              {errors?.confirmPassword && (
                <span className="mt-1 text-sm text-red-400">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="bio" className="sr-only">
                소개
              </label>
              <textarea
                {...register("bio")}
                className={`appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm resize-none ${errors.bio ? "border-red-500" : ""}`}
                placeholder="소개 (선택 사항)"
              />
              {errors.bio && (
                <span className="mt-1 text-sm text-red-400">
                  {errors.bio.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="avatar" className="sr-only">
                아바타 이미지 URL
              </label>
              <input
                {...register("avatar")}
                type="text"
                className={`appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${errors.avatar ? "border-red-500" : ""}`}
                placeholder="아바타 이미지 URL (선택 사항)"
              />
              {errors.avatar && (
                <span className="mt-1 text-sm text-red-400">
                  {errors.avatar.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              회원가입
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
                소셜 계정으로 회원가입 또는 로그인
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
              Google 계정으로 회원가입/로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
