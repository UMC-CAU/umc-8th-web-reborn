import { QUERY_KEYS } from "../../constants/key";
import { getMyInfo } from "../../apis/auth";
import { useQuery } from "@tanstack/react-query";

function useGetMyInfo(accessToken:string|null) {
    return useQuery({
        queryKey:[QUERY_KEYS.myInfo],
        queryFn: getMyInfo,
        enabled:!!accessToken})
}

export default useGetMyInfo