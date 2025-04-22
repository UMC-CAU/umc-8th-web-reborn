import { CommonResponse } from "./common";

// 회원가입 요청 타입
export type RequestSignupDto = {
    name: string;
    email: string;
    bio?: string;
    avatar?: string;
    password: string;
};

// 회원가입 응답 타입
export type ResponseSignupDto = CommonResponse<{
    id: number;
    name: string;
    email: string;
    bio?: string | null;
    avatar?: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;

// 로그인 요청 타입
export type RequestLoginDto = {
    email: string;
    password: string;
};

// 로그인 응답 타입
export type ResponseLoginDto = CommonResponse<{
    id: number;
    name: string;
    accessToken: string;
    refreshToken: string;
}>;

// 내 정보 조회 응답 타입
export type ResponseMyInfoDto = CommonResponse<{
    id: number;
    name: string;
    email: string;
    bio?: string | null;
    avatar?: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
