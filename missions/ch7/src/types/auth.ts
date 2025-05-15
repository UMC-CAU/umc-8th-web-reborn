import { z } from "zod";

// 로그인 스키마
export const signinSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일을 입력해주세요" })
    .email({ message: "올바른 이메일 형식이 아닙니다" }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 8자 이상이어야 합니다" })
    .max(20, { message: "비밀번호는 20자 이하여야 합니다" }),
});

// 회원가입 스키마
export const signupSchema = signinSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

// 폼 데이터 타입
export type SigninFormData = z.infer<typeof signinSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;

// API 요청 타입
export interface RequestLoginDto {
  email: string;
  password: string;
}

export interface RequestSignupDto {
  email: string;
  password: string;
}

// 사용자 정보 타입
export interface UserDto {
  id: number | string;
  email: string;
  name?: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

// API 응답 타입
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDto | null;
}

export type ResponseLoginDto = LoginResponse;

export interface ResponseSignupDto extends Omit<LoginResponse, "user"> {
  user?: UserDto;
}

export type ResponseMyInfoDto = UserDto;

export interface ResponseLogoutDto {
  message: string;
}

// Auth Context 타입
export interface AuthState {
  isAuthenticated: boolean;
  user: UserDto | null;
  accessToken: string | null;
}

export interface AuthContextType extends AuthState {
  login: (response: LoginResponse) => void;
  logout: () => void;
  updateAccessToken: (token: string) => void;
  debugLogin?: () => void;
}
