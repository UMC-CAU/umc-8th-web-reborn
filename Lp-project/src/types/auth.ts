import { z } from "zod";

// 로그인 스키마
/**
 * 사용자 로그인을 위한 Zod 스키마
 * @schema signinSchema
 */
export const signinSchema = z.object({
  /** 사용자 이메일 주소 */
  email: z
    .string()
    .min(1, { message: "이메일을 입력해주세요" })
    .email({ message: "올바른 이메일 형식이 아닙니다" }),
  /** 사용자 비밀번호 (8자 이상 20자 이하) */
  password: z
    .string()
    .min(8, { message: "비밀번호는 8자 이상이어야 합니다" })
    .max(20, { message: "비밀번호는 20자 이하여야 합니다" }),
});

// 회원가입 스키마
/**
 * 사용자 회원가입을 위한 Zod 스키마
 * 비밀번호 확인 및 이름 필드를 포함합니다.
 * @schema signupSchema
 */
export const signupSchema = signinSchema
  .extend({
    /** 비밀번호 확인 필드 (비밀번호와 일치해야 함) */
    confirmPassword: z.string(),
    /** 사용자 이름 (1자 이상) */
    name: z.string().min(1, { message: "이름을 입력해주세요" }),
    /** 사용자 소개 (선택 사항) */
    bio: z.string().optional(),
    /** 사용자 아바타 이미지 URL (선택 사항) */
    avatar: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

// 폼 데이터 타입
/**
 * 로그인 폼 데이터 타입
 * @typedef {object} SigninFormData
 */
export type SigninFormData = z.infer<typeof signinSchema>;
/**
 * 회원가입 폼 데이터 타입
 * @typedef {object} SignupFormData
 */
export type SignupFormData = z.infer<typeof signupSchema>;

// API 요청 타입
/**
 * 로그인 API 요청 DTO
 * @interface RequestLoginDto
 */
export interface RequestLoginDto {
  email: string;
  password: string;
}

/**
 * 회원가입 API 요청 DTO
 * @interface RequestSignupDto
 */
export interface RequestSignupDto {
  email: string;
  password: string;
  name?: string;
  bio?: string;
  avatar?: string;
}

// 사용자 정보 타입
/**
 * 사용자 정보를 나타내는 DTO
 * @interface UserDto
 */
export interface UserDto {
  id: number | string;
  email: string;
  name?: string;
  profileImage?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

// API 응답 타입
/**
 * 로그인 성공 시 백엔드 응답 데이터 구조
 * @interface LoginResponse
 */
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDto | null; // 백엔드 응답에 사용자 정보가 포함될 경우
}

/**
 * 로그인 API 응답 DTO (일반적인 ApiResponseWrapper 내 data 필드 타입)
 * @typedef {object} ResponseLoginDto
 */
export type ResponseLoginDto = LoginResponse;

/**
 * 백엔드 API 응답의 표준 Wrapper 구조
 * @interface ApiResponseWrapper
 * @template T 응답 데이터의 타입
 */
export interface ApiResponseWrapper<T> {
  status: boolean;
  message: string;
  statusCode: number;
  data: T;
}

/**
 * 로그인 API의 data 필드 내부 타입
 * @interface LoginData
 * @description 서버에서 반환하는 로그인 데이터 (토큰 및 사용자 ID/이름 포함)
 */
export interface LoginData {
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
}

/**
 * 회원가입 API 응답 DTO
 * @typedef {object} ResponseSignupDto
 * @description 회원가입 성공 시 응답 데이터 (토큰 포함)
 */
export interface ResponseSignupDto extends Omit<LoginResponse, "user"> {
  user?: UserDto; // 회원가입 응답에도 사용자 정보가 포함될 수 있음
}

/**
 * 내 정보 조회 API 응답 DTO (ApiResponseWrapper 내 data 필드 타입)
 * @typedef {object} ResponseMyInfoDto
 */
export type ResponseMyInfoDto = UserDto;

/**
 * 로그아웃 API 응답 DTO
 * @interface ResponseSignoutDto
 */
export interface ResponseSignoutDto {
  message: string;
}
