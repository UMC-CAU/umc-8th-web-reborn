import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { useAuthStore } from "../store/authStore";
import usePostLike from "../hooks/mutations/usePostLike";
import Heart from "../components/Heart";

const LpDetailPage = () => {
  const params = useParams();
  const lpId = Number(params.lpId);
  const { user: me } = useAuthStore();
  const { data: lp, isPending, isError } = useGetLpDetail(lpId);
  const { mutate: likeMutate } = usePostLike();

  const isLiked = lp?.data.likes
    .map((like: { userId: any }) => like.userId)
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
    <div className="mt-12 w-full">
      <h1 className="text-white text-2xl font-bold">{lp.data.title}</h1>
      <img
        src={lp.data.thumbnail}
        alt={lp.data.title}
        className="w-full h-48 object-cover"
      />
      <p className="mt-4 text-gray-300 whitespace-pre-line">
        {lp.data.content}
      </p>
      <button onClick={handleLikeLp} className="flex items-center mt-4">
        <Heart
          color={isLiked ? "red" : "gray"}
          fill={isLiked ? "red" : "transparent"}
        />
      </button>
    </div>
  );
};

export default LpDetailPage;
