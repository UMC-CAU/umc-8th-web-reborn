import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/key";
import { PAGINATION_ORDER } from "../../enums/common";
import { getLpList } from "../../apis/lp";
import { type ResponseLpListDto } from "../../types/lp";

interface UseGetInfiniteLpListProps {
  limit?: number;
  search?: string;
  order?: PAGINATION_ORDER;
}

export function useGetInfiniteLpList({
  limit = 8,
  search,
  order = PAGINATION_ORDER.desc,
}: UseGetInfiniteLpListProps) {
  return useInfiniteQuery<ResponseLpListDto>({
    queryKey: [QUERY_KEYS.lps, { order, limit, search }],
    queryFn: ({ pageParam }) =>
      getLpList({
        cursor: pageParam as number,
        limit,
        order,
        search,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
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
