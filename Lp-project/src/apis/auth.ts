import {
  type RequestLoginDto,
  type RequestSignupDto,
  type ResponseLoginDto,
  type ResponseSignupDto,
  type ResponseSignoutDto,
  type UserDto,
  type ApiResponseWrapper,
  type LoginData,
} from "../types/auth";
import { axiosInstance } from "./axios";

export const postSignup = async (
  body: RequestSignupDto,
): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.post<ResponseSignupDto>(
    `/v1/auth/signup`,
    body,
  );

  return data;
};

export const postSignin = async (
  body: RequestLoginDto,
): Promise<ApiResponseWrapper<LoginData>> => {
  const { data } = await axiosInstance.post<ApiResponseWrapper<LoginData>>(
    `/v1/auth/signin`,
    body,
  );

  return data;
};

export const getMyInfo = async (): Promise<ApiResponseWrapper<UserDto>> => {
  const { data } =
    await axiosInstance.get<ApiResponseWrapper<UserDto>>("/v1/users/me");

  return data;
};

export const postSignout = async () => {
  const { data } =
    await axiosInstance.post<ApiResponseWrapper<ResponseSignoutDto>>(
      `/v1/auth/signout`,
    );

  return data;
};

export const refreshAccessToken = async (): Promise<
  ApiResponseWrapper<LoginData>
> => {
  const { data } =
    await axiosInstance.post<ApiResponseWrapper<LoginData>>(`/v1/auth/refresh`);

  return data;
};

export const postGoogleLogin = async (
  accessToken: string,
): Promise<ApiResponseWrapper<LoginData>> => {
  const { data } = await axiosInstance.post<ApiResponseWrapper<LoginData>>(
    "/v1/auth/google",
    { accessToken },
  );
  return data;
};
