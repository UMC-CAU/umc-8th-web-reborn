import { RequestLoginDto, RequestSignupDto, ResponseLoginDto, ResponseMyInfoDto, ResponseSignupDto, ResponseLogoutDto } from "../types/auth";
import axiosInstance from "./axios";

export const postSignup = async (body: RequestSignupDto): Promise<ResponseSignupDto> => {
    const { data } = await axiosInstance.post<ResponseSignupDto>(
        `/api/auth/signup`,
        body
    );

    return data;
};

export const postSignin = async (body: RequestLoginDto): Promise<ResponseLoginDto> => {
    const { data } = await axiosInstance.post<ResponseLoginDto>(
        `/api/auth/signin`,
        body
    );

    return data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
    const { data } = await axiosInstance.get<ResponseMyInfoDto>(
        `/api/auth/my-info`
    );

    return data;
};

export const postLogout = async () => {
    const { data } = await axiosInstance.post<ResponseLogoutDto>(
        `/api/auth/logout`
    );

    return data;
};

