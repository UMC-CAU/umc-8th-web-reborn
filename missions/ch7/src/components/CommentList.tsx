import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { PAGINATION_ORDER } from "../enums/common";
import useGetComments from "../hooks/queries/useGetComments";
import CommentSkeleton from "./CommentSkeleton";

interface CommentListProps {
  lpId: number;
}

const CommentList = ({ lpId }: CommentListProps) => {
  const [sortOrder, setSortOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  
  // IntersectionObserver ref for infinite scrolling
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // React Query 무한 스크롤 사용
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetComments({
    lpId,
    order: sortOrder,
    limit: 5,
  });

  // 관찰 대상이 화면에 보일 때 다음 페이지 로드
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 정렬 순서 변경 핸들러
  const handleSortChange = () => {
    setSortOrder(
      sortOrder === PAGINATION_ORDER.desc
        ? PAGINATION_ORDER.asc
        : PAGINATION_ORDER.desc
    );
  };

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
    <div className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">댓글</h3>
        <button
          onClick={handleSortChange}
          className="px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
        >
          {sortOrder === PAGINATION_ORDER.desc ? "최신순" : "오래된순"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                sortOrder === PAGINATION_ORDER.desc
                  ? "M3 4h13M3 8h9M3 12h5M13 12L17 8m0 0l-4-4m4 4H9"
                  : "M3 4h13M3 8h9M3 12h5M13 12L17 16m0 0l-4 4m4-4H9"
              }
            />
          </svg>
        </button>
      </div>

      {/* 댓글 입력 폼 */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          placeholder="댓글을 입력하세요..."
        ></textarea>
        <div className="flex justify-end mt-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            댓글 작성
          </button>
        </div>
      </div>

      {/* 댓글 목록 */}
      {isLoading ? (
        // 로딩 중일 때 스켈레톤 UI 표시
        <>
          {Array.from({ length: 3 }).map((_, index) => (
            <CommentSkeleton key={index} />
          ))}
        </>
      ) : isError ? (
        // 에러 발생 시 메시지 표시
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          댓글을 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.
        </div>
      ) : (
        <>
          {/* 댓글 목록 */}
          {data?.pages.map((page) =>
            page.data.map((comment) => (
              <div
                key={comment.id}
                className="bg-white rounded-lg shadow-sm p-4 mb-4"
              >
                <div className="flex items-center mb-2">
                  <img
                    src={comment.author?.profileImage || "https://via.placeholder.com/40"}
                    alt={comment.author?.name || "사용자"}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {comment.author?.name || "익명 사용자"}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 whitespace-pre-line">
                  {comment.content}
                </p>
              </div>
            ))
          )}
          {/* 무한 스크롤 트리거 */}
          {hasNextPage && (
            <div
              ref={ref}
              className="h-10 flex items-center justify-center my-4"
            >
              {isFetchingNextPage}
            </div>
          )}

          {/* 더 이상 댓글이 없는 경우 */}
          {!hasNextPage && !isLoading && data?.pages[0]?.data && data.pages[0].data.length > 0 && (
            <div className="text-center text-gray-500 my-4">
              더 이상 표시할 댓글이 없습니다.
            </div>
          )}

          {/* 댓글이 없는 경우 */}
          {!isLoading && data?.pages[0]?.data && data.pages[0].data.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                아직 댓글이 없습니다. 첫 번째 댓글을 남겨보세요!
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CommentList; 