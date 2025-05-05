export type CommonResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export type ResponseSignupDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  profileImage: string | null;
  createdAt: Date;
  updatedAt: Date;
}>;

// 로그인 응답 타입
export type ResponseLoginDto = CommonResponse<{
  email: string;
  password: string;
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
  bio: string | null;
  profileImage: string | null;
  createdAt: Date;
  updatedAt: Date;
}>;
