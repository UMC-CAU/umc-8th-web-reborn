import { useInfiniteQuery } from "@tanstack/react-query";
import { PAGINATION_ORDER } from "../../enums/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEYS } from "../../constants/key";

function useGetInfiniteLpList(
    limit: number,
    search: string,
    order: PAGINATION_ORDER,
) {
    return useInfiniteQuery({
        queryFn: ({pageParam}) =>
            getLpList({cursor:pageParam, limit, search, order}),
        queryKey: [QUERY_KEYS.lps, search, order],
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.hasNext ? lastPage.data.nextCursor : undefined;
        },
        initialPageParam: 0,
    })
}

export default useGetInfiniteLpList;
