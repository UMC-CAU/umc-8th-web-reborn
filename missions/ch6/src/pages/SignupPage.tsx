import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { SignupFormData, signupSchema } from "../types/auth";
import { z } from "zod";
import { GoogleLogin } from "../components/GoogleLogin";
import { useAuth } from "../context/AuthContext";

const SignupPage = (): React.ReactElement => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const { values, errors, touched, getInputProps, handleSubmit } =
    useForm<SignupFormData>({
      initialValue: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      validate: (values) => {
        try {
          signupSchema.parse(values);
          return {
            email: null,
            password: null,
            confirmPassword: null,
          };
        } catch (error) {
          if (error instanceof z.ZodError) {
            return {
              email:
                error.errors.find((e) => e.path[0] === "email")?.message ||
                null,
              password:
                error.errors.find((e) => e.path[0] === "password")?.message ||
                null,
              confirmPassword:
                error.errors.find((e) => e.path[0] === "confirmPassword")
                  ?.message || null,
            };
          }
          return {
            email: "유효성 검사 오류",
            password: "유효성 검사 오류",
            confirmPassword: "유효성 검사 오류",
          };
        }
      },
    });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e);

    // 에러가 없는 경우에만 회원가입 처리
    if (Object.values(errors).every((error) => error === null)) {
      setIsLoading(true);
      setApiError(null);

      try {
        // 실제 API 호출 대신 테스트용 데이터로 성공 처리
        // const result = await postSignup({
        //     email: values.email,
        //     password: values.password
        // });

        // 테스트용 가짜 응답 생성
        const mockResult = {
          accessToken: `signup-${Date.now()}-token`,
          refreshToken: `refresh-${Date.now()}-token`,
          user: {
            id: Date.now(),
            email: values.email,
            name: values.email.split("@")[0], // 이메일 아이디 부분을 이름으로 사용
          },
        };

        // API 호출 시뮬레이션을 위해 약간의 지연 추가
        setTimeout(() => {
          // 회원가입 후 바로 로그인 처리
          login(mockResult);
          alert("회원가입에 성공했습니다!");
          navigate("/"); // 홈페이지로 이동
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("회원가입 실패:", error);
        setApiError("회원가입에 실패했습니다. 다시 시도해주세요.");
        setIsLoading(false);
      }
    }
  };

  const handleLoginSuccess = () => {
    navigate("/", { replace: true });
  };

  const handleLoginError = (error: string) => {
    setApiError(error);
  };

  const isDisabled = useMemo(() => {
    return isLoading || Object.values(errors).some((error) => error !== null);
  }, [errors, isLoading]);

  const inputClassName = (fieldName: keyof SignupFormData) => `
        border border-[#ccc] 
        w-[300px] 
        p-[10px] 
        rounded-sm
        focus:border-[#807bff]
        ${
          errors?.[fieldName] && touched?.[fieldName]
            ? "border-red-500 bg-red-200"
            : "border-gray-300"
        }
    `;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
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
            회원가입
          </h2>
        </div>

        {apiError && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{apiError}</div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="flex flex-col gap-3">
              <input
                {...getInputProps("email")}
                type="email"
                className={inputClassName("email")}
                placeholder="이메일"
              />
              {errors?.email && touched?.email && (
                <div className="text-red-500 text-sm">{errors.email}</div>
              )}

              <input
                {...getInputProps("password")}
                type="password"
                className={inputClassName("password")}
                placeholder="비밀번호"
              />
              {errors?.password && touched?.password && (
                <div className="text-red-500 text-sm">{errors.password}</div>
              )}

              <input
                {...getInputProps("confirmPassword")}
                type="password"
                className={inputClassName("confirmPassword")}
                placeholder="비밀번호 확인"
              />
              {errors?.confirmPassword && touched?.confirmPassword && (
                <div className="text-red-500 text-sm">
                  {errors.confirmPassword}
                </div>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isDisabled}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "처리 중..." : "회원가입"}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                소셜 계정으로 회원가입
              </span>
            </div>
          </div>

          <div>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
            />
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              이미 계정이 있으신가요? 로그인하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
