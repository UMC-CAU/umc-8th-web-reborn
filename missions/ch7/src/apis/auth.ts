import {
  RequestLoginDto,
  RequestSignupDto,
  ResponseLoginDto,
  ResponseMyInfoDto,
  ResponseSignupDto,
  ResponseLogoutDto,
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
): Promise<ResponseLoginDto> => {
  const { data } = await axiosInstance.post<ResponseLoginDto>(
    `/v1/auth/signin`,
    body,
  );

  return data;
};

export const getMyInfo = async ():Promise<ResponseMyInfoDto>=> {
  const { data } = await axiosInstance.get("/v1/users/me",{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
  }
  })

  return data

}

export const postLogout = async () => {
  const { data } =
    await axiosInstance.post<ResponseLogoutDto>(`/v1/auth/logout`);

  return data;
};

export const refreshAccessToken = async (): Promise<ResponseLoginDto> => {
  const { data } =
    await axiosInstance.post<ResponseLoginDto>(`/v1/auth/refresh`);

  return data;
};

export const postGoogleLogin = async (
  accessToken: string,
): Promise<ResponseLoginDto> => {
  const { data } = await axiosInstance.post<ResponseLoginDto>(
    "/v1/auth/google",
    { accessToken },
  );
  return data;
};
