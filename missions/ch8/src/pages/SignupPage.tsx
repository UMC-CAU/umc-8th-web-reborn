import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { postSignup } from "../apis/auth";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "../components/GoogleLogin";
import { signupSchema, SignupFormData } from "../types/authSchemas";

type formFields = SignupFormData;

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<formFields> = async (data) => {
    // name도 함께 전송
    const { email, password, name } = data;

    const response = await postSignup({ email, password, name });
    console.log(response);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
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
          <p className="mt-2 text-center text-sm text-gray-600">
            또는{" "}
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              로그인하기
            </a>
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">이메일</label>
              <input
                {...register("email")}
                type="email"
                className={`appearance-none rounded relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${errors?.email ? "border-red-500" : "border-gray-300"}`}
                placeholder="이메일"
              />
              {errors?.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">비밀번호</label>
              <input
                {...register("password")}
                type="password"
                className={`appearance-none rounded relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${errors?.password ? "border-red-500" : "border-gray-300"}`}
                placeholder="비밀번호"
              />
              {errors?.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="passwordCheck" className="sr-only">비밀번호 확인</label>
              <input
                {...register("passwordCheck")}
                type="password"
                className={`appearance-none rounded relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${errors?.passwordCheck ? "border-red-500" : "border-gray-300"}`}
                placeholder="비밀번호 확인"
              />
              {errors?.passwordCheck && (
                <p className="mt-1 text-sm text-red-600">{errors.passwordCheck.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="name" className="sr-only">이름</label>
              <input
                {...register("name")}
                type="text"
                className={`appearance-none rounded relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${errors?.name ? "border-red-500" : "border-gray-300"}`}
                placeholder="이름"
              />
              {errors?.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "회원가입 중..." : "회원가입"}
            </button>
          </div>
        </form>

        <div className="mt-6">
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

          <div className="mt-6">
            <GoogleLogin
              onError={(error) => console.error("Google 회원가입 오류:", error)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
