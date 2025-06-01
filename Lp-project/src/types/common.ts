import { PAGINATION_ORDER } from "../enums/common";

/**
 * 백엔드 API 응답의 공통 Wrapper 구조
 * ApiResponseWrapper와 유사하지만, 다양한 응답에서 사용될 수 있는 일반적인 형태입니다.
 * @interface CommonResponse
 * @template T 응답 데이터의 타입
 */
export type CommonResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

/**
 * 커서 기반 페이지네이션 응답 구조
 * @interface CursorBasedResponse
 * @template T 페이지의 데이터 타입
 */
export type CursorBasedResponse<T> = CommonResponse<{
  data: T; // 페이지 데이터 배열
  nextCursor: number | null; // 다음 페이지 커서
  hasNext: boolean; // 다음 페이지 존재 여부
}>;

/**
 * 페이지네이션 요청 DTO
 * @typedef {object} PaginationDto
 */
export type PaginationDto = {
  cursor?: number; // 커서 (페이지네이션 시작점)
  limit?: number; // 페이지당 항목 수
  search?: string; // 검색어
  order?: PAGINATION_ORDER; // 정렬 순서
};
