import { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/key";

function useGetLpList({cursor,search,order,limit}: PaginationDto) {
    return useQuery({
        queryKey: [QUERY_KEYS.lps, { cursor, search, order, limit }],
        queryFn: () => 
            getLpList({
                cursor,
                search,
                order,
                limit,
            }),
            // 데이터가 신선하다고 간주하는 시간
            // 이 시간 동안은 캐시된 데이터를 그대로 사용합니다. 컴포넌트가 마운트 되거나 창에 포커스 들어오는 경우에도 재요청하지 않음
            // 5분 동안 기존 데이터를 그대로 활용해서 네트워크 요청을 줄인다
            staleTime: 1000 * 60 * 5,

            // 사용되지 않는 (비활성 상태) 쿼리 데이터가 캐시에 남아있는 시간.
            // staleTime이 지나고 데이터가 신선하지 않더라도, 일정 시간 동안 메모리에 보관.
            // 그 이후에 해당 쿼리가 전혀 사용되지 않으면 gcTime이 지난 후에 제거한다. (garbage collection)
            // 예) 10분 동안 사용되지 않으면 해당 캐시 데이터가 삭제되어, 다시 요청 시 새 데이터를 받아오게 합니다.
            gcTime: 1000 * 60 * 10,
    })
}

export default useGetLpList;
