import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "../components/GoogleLogin";
import { useAuth } from "../context/AuthContext";
import { postSignin } from "../apis/auth";
import useForm from "../hooks/useForm";
import { SigninFormData, signinSchema } from "../types/auth";
import { z } from "zod";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, touched, getInputProps, handleSubmit } =
    useForm<SigninFormData>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: (values) => {
        try {
          signinSchema.parse(values);
          return {
            email: null,
            password: null,
          };
        } catch (error) {
          if (error instanceof z.ZodError) {
            // Zod error 형식에 맞게 처리
            return {
              email:
                error.errors.find((e) => e.path[0] === "email")?.message ||
                null,
              password:
                error.errors.find((e) => e.path[0] === "password")?.message ||
                null,
            };
          }
          return {
            email: "유효성 검사 오류",
            password: "유효성 검사 오류",
          };
        }
      },
    });

  const [error, setError] = useState("");

  const handleLoginSuccess = () => {
    navigate("/", { replace: true });
  };

  const handleLoginError = (error: string) => {
    setError(error);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e);

    // errors 객체에 오류가 있는지 확인
    if (Object.values(errors).some((err) => err !== null)) {
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // 실제 API 호출
      const data = await postSignin({
        email: values.email,
        password: values.password,
      });
      login(data);
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
      setError("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <button
            onClick={() => navigate("/")}
            className="mb-4 text-indigo-600 hover:text-indigo-500 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            홈으로 돌아가기
          </button>

          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            로그인
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            또는{" "}
            <a
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              회원가입하기
            </a>
          </p>
        </div>
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                이메일
              </label>
              <input
                {...getInputProps("email")}
                type="email"
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="이메일"
              />
              {touched.email && errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                비밀번호
              </label>
              <input
                {...getInputProps("password")}
                type="password"
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="비밀번호"
              />
              {touched.password && errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                소셜 계정으로 로그인
              </span>
            </div>
          </div>

          <div className="mt-6">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
