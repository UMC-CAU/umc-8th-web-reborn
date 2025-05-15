import { useMutation } from "@tanstack/react-query";
import { createLp } from "../../apis/lp";
import { queryclient } from "../../App";
import { QUERY_KEYS } from "../../constants/key";
import { CreateLpDto, ResponseLpDetailDto } from "../../types/lp";

/**
 * LP 생성을 위한 mutation hook
 */
function usePostLp() {
  return useMutation({
    mutationFn: (lpData: CreateLpDto) => createLp(lpData),
    
    // 성공 시 LP 목록 쿼리 무효화 (새로운 데이터 패치 유도)
    onSuccess: (data: ResponseLpDetailDto) => {
      queryclient.invalidateQueries({
        queryKey: [QUERY_KEYS.lps],
      });
    },
    
    // 에러 발생 시 처리
    onError: (error) => {
      console.error("LP 생성 실패:", error);
    },
  });
}

export default usePostLp; 