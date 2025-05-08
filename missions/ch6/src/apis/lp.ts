import { axiosInstance } from "./axios";
import { PaginationDto } from "../types/common";
import { ResponseLpDetailDto, ResponseLpListDto } from "../types/lp";

export const getLpList = async (
    paginationDto: PaginationDto,
): Promise<ResponseLpListDto> => {
    try {
        const { cursor, limit, order, search } = paginationDto;
        const response = await axiosInstance.get('/v1/lps', {
            params: {
                cursor,
                limit,
                order,
                search
            }
        });
        return response.data;
    } catch (error) {
        console.error("LP 목록 불러오기 실패:", error);
        throw error;
    }
};

export const getLpDetail = async (
    lpId: number
): Promise<ResponseLpDetailDto> => {
    try {
        const response = await axiosInstance.get(`/v1/lps/${lpId}`);
        return response.data;
    } catch (error) {
        console.error(`LP 상세정보(ID: ${lpId}) 불러오기 실패:`, error);
        throw error;
    }
};


