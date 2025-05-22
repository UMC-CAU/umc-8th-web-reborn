import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { QUERY_KEYS } from "../../constants/key";
import { queryclient } from "../../App";
import { Likes, ResponseLpDetailDto } from "../../types/lp";
import { ResponseMyInfoDto } from "../../types/auth";

function usePostLike() {
  return useMutation({
    mutationFn: postLike,
    //data -> api 성공 응답 데이터
    //variables -> mutate에 전달한 데이터
    //context -> onMutate에서 반환한 데이터
    onSuccess: (data) => {
      queryclient.invalidateQueries({
        queryKey: [QUERY_KEYS.lps, data.lpId],
        exact: true,
      });
    },
    onMutate: async ({ lpId }) => {
      await queryclient.cancelQueries({
        queryKey: [QUERY_KEYS.lps, lpId],
      });
      const previousLpPost = queryclient.getQueryData<ResponseLpDetailDto>([
        QUERY_KEYS.lps,
        lpId,
      ]);

      const newLpPost = { ...previousLpPost };
      console.log(lpId);

      const me = queryclient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEYS.myInfo,
      ]);
      const userId = Number(me?.data.id);

      const likeIndex =
        previousLpPost?.data.likes.findIndex(
          (like) => like.userId === userId,
        ) ?? -1;

      if (likeIndex >= 0) {
        previousLpPost?.data.likes.splice(likeIndex, 1);
      } else {
        const newLike = { userId, lpId: lpId } as Likes;
        previousLpPost?.data.likes.push(newLike);
      }

      queryclient.setQueryData([QUERY_KEYS.lps, lpId], newLpPost);

      return { previousLpPost, newLpPost };
    },

    // error -> 요청 실패시 발생한 에러
    // variables -> 요청 실패시 전달한 데이터
    // context -> onMutate에서 반환한 데이터
    onError: (error, variables, context) => {
      console.log(error, variables, context);
      queryclient.setQueryData(
        [QUERY_KEYS.lps, variables.lpId],
        context?.previousLpPost,
      );
    },

    onSettled: async (data, error, variables, context) => {
      await queryclient.invalidateQueries({
        queryKey: [QUERY_KEYS.lps, variables.lpId],
      });
    },
  });
}

export default usePostLike;
