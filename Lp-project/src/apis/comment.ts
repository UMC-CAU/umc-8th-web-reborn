import { axiosInstance } from "./axios";
import { type PaginationDto } from "../types/common";
import { type ResponseCommentListDto } from "../types/comment";

export const getCommentsByLpId = async (
  lpId: number,
  paginationDto: PaginationDto,
): Promise<ResponseCommentListDto> => {
  try {
    const { cursor, limit, order } = paginationDto;
    const response = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
      params: {
        cursor,
        limit,
        order,
      },
    });
    return response.data;
  } catch (error) {
    console.error("댓글 불러오기 실패:", error);
    throw error;
  }
};
