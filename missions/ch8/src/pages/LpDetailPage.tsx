import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import useGetMyInfo from "../hooks/queries/useGetMyInfo.ts";
import { useAuth } from "../context/AuthContext";
import usePostLike from "../hooks/mutations/usePostLike";
import Heart from "../components/Heart";

const LpDetailPage = () => {
  const params = useParams();
  const lpId = Number(params.lpId);
  const { accessToken } = useAuth();
  const { data: lp, isPending, isError } = useGetLpDetail(lpId);
  const { data: me } = useGetMyInfo(accessToken);
  // mutate -> 비동기 요청을 실행하고, 콜백 함수를 이용해서 후속 작업 처리함.
  // mutateAsync -> Promise를 반환하고, await 사용 가능
  const { mutate: likeMutate } = usePostLike();

  const isLiked = lp?.data.likes
    .map((like) => like.userId)
    .includes(typeof me?.id === "number" ? me.id : -1);

  const handleLikeLp = () => {
    if (!isLiked && me?.id) {
      likeMutate({ lpId });
    }
  };

  if (isPending) {
    return <div className="mt-12">Loading...</div>;
  }

  if (isError) {
    return <div className="mt-12">Error</div>;
  }

  return (
    <div className="mt-12">
      <h1>{lp.data.title}</h1>
      <img
        src={lp.data.thumbnail}
        alt={lp.data.title}
        className="w-full h-48 object-cover"
      />
      <p>{lp.data.content}</p>
      <button onClick={handleLikeLp} className="flex items-center mt-4">
        <Heart
          color={isLiked ? "red" : "black"}
          fill={isLiked ? "red" : "transparent"}
        />
      </button>
    </div>
  );
};

export default LpDetailPage;
