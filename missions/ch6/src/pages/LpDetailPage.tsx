import { useNavigate, useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import CommentList from "../components/CommentList";

const LpDetailPage = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const navigate = useNavigate();

  const { data, isPending, isError } = useGetLpDetail(Number(lpId));

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          LP를 불러오는데 실패했습니다
        </h2>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  const lp = data.data;

  // 날짜 포맷팅 함수
  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="pt-16 pb-8 px-4 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* LP 상세 정보 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          {/* 헤더 이미지 */}
          <div className="h-64 w-full relative">
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 콘텐츠 */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-bold text-gray-900">{lp.title}</h1>
              <div className="flex items-center">
                <span className="text-gray-600 mr-4">
                  {formatDate(lp.createdAt)}
                </span>
                <div className="flex items-center text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-500 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{lp.likes.length}</span>
                </div>
              </div>
            </div>

            {/* 태그 */}
            <div className="mb-6 flex flex-wrap">
              {lp.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                >
                  {tag.name}
                </span>
              ))}
            </div>

            {/* 내용 */}
            <div className="prose max-w-none mb-8">
              <p className="whitespace-pre-line">{lp.content}</p>
            </div>

            {/* 액션 버튼 */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-100"
              >
                뒤로 가기
              </button>
              <div className="space-x-2">
                <button className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  좋아요
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 댓글 섹션 */}
        {lpId && <CommentList lpId={Number(lpId)} />}
      </div>
    </div>
  );
};

export default LpDetailPage; 