import { axiosInstance } from "./axios";
import { PaginationDto } from "../types/common";
import {
  RequestLpDetailDto,
  ResponseLpDetailDto,
  ResponseLpListDto,
  ResponsetLikeLpDto,
  CreateLpDto,
} from "../types/lp";

export const getLpList = async (
  paginationDto: PaginationDto,
): Promise<ResponseLpListDto> => {
  try {
    const { cursor, limit, order, search } = paginationDto;
    const response = await axiosInstance.get("/v1/lps", {
      params: {
        cursor,
        limit,
        order,
        search,
      },
    });
    return response.data;
  } catch (error) {
    console.error("LP 목록 불러오기 실패:", error);
    throw error;
  }
};

export const getLpDetail = async (
  lpId: number,
): Promise<ResponseLpDetailDto> => {
  try {
    const response = await axiosInstance.get(`/v1/lps/${lpId}`);
    return response.data;
  } catch (error) {
    console.error(`LP 상세정보(ID: ${lpId}) 불러오기 실패:`, error);
    throw error;
  }
};

export const postLike = async ({
  lpId,
}: RequestLpDetailDto): Promise<ResponsetLikeLpDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
  return data;
};

export const deleteLike = async ({
  lpId,
}: RequestLpDetailDto): Promise<ResponsetLikeLpDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
  return data;
};

export const createLp = async (
  lpData: CreateLpDto,
): Promise<ResponseLpDetailDto> => {
  try {
    // FormData 생성
    const formData = new FormData();
    formData.append("title", lpData.title);
    formData.append("artist", lpData.artist);

    // 태그 추가
    if (lpData.tags && lpData.tags.length > 0) {
      lpData.tags.forEach((tag) => {
        formData.append("tags", tag);
      });
    }

    // 썸네일 추가
    if (lpData.thumbnail) {
      formData.append("thumbnail", lpData.thumbnail);
    }

    const response = await axiosInstance.post("/v1/lps", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("LP 생성 실패:", error);
    throw error;
  }
};
