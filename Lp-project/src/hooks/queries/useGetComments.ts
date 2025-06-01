import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/key";
import { PAGINATION_ORDER } from "../../enums/common";
import { getCommentsByLpId } from "../../apis/comment";
import { type ResponseCommentListDto } from "../../types/comment";

interface UseGetCommentsProps {
  lpId: number;
  limit?: number;
  order?: PAGINATION_ORDER;
}

function useGetComments({
  lpId,
  limit = 5,
  order = PAGINATION_ORDER.desc,
}: UseGetCommentsProps) {
  return useInfiniteQuery<ResponseCommentListDto>({
    queryKey: [QUERY_KEYS.comments, lpId, { order, limit }],
    queryFn: ({ pageParam }) =>
      getCommentsByLpId(lpId, {
        cursor: pageParam as number,
        limit,
        order,
      }),
    getNextPageParam: (lastPage: ResponseCommentListDto) => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    getPreviousPageParam: () => {
      // 첫 페이지의 이전 페이지 파라미터 (보통 필요 없음)
      return 0;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 2, // 2분
    gcTime: 1000 * 60 * 5, // 5분
  });
}

export default useGetComments;
