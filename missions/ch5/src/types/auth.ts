import { z } from 'zod';

// 로그인 스키마
export const signinSchema = z.object({
    email: z.string()
        .min(1, { message: '이메일을 입력해주세요' })
        .email({ message: '올바른 이메일 형식이 아닙니다' }),
    password: z.string()
        .min(8, { message: '비밀번호는 8자 이상이어야 합니다' })
        .max(20, { message: '비밀번호는 20자 이하여야 합니다' })
});

// 회원가입 스키마
export const signupSchema = signinSchema.extend({
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"]
});

// 폼 데이터 타입
export type SigninFormData = z.infer<typeof signinSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;

// API 응답 타입
export interface ResponseLoginDto {
    accessToken: string;
    refreshToken: string;
}

export interface ResponseSignupDto {
    id: string;
    email: string;
}

export interface ResponseMyInfoDto {
    id: string;
    email: string;
    name: string;
}

export interface ResponseLogoutDto {
    message: string;
}
