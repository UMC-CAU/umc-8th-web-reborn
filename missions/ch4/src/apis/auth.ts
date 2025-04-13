import { RequestLoginDto, RequestSignupDto, ResponseLoginDto, ResponseMyInfoDto, ResponseSignupDto } from "../types/auth";
import axiosInstance from "./axios";

export const postSignup = async (body: RequestSignupDto): Promise<ResponseSignupDto> => {
    const { data: responseData } = await axiosInstance.post<ResponseSignupDto>(
        `/api/auth/signup`,
        body
    );

    return responseData;
};

export const postSignin = async (body: RequestLoginDto): Promise<ResponseLoginDto> => {
    const { data: responseData } = await axiosInstance.post<ResponseLoginDto>(
        `/api/auth/signin`,
        body
    );

    return responseData;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
    const { data: responseData } = await axiosInstance.get<ResponseMyInfoDto>(
        `/api/auth/my-info`
    );

    return responseData;
};
