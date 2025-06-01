import Skeleton from "./Skeleton";

const CommentSkeleton = () => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-sm p-4 mb-3">
      <div className="flex items-center mb-2">
        {/* 프로필 이미지 스켈레톤 */}
        <Skeleton
          width="2.5rem"
          height="2.5rem"
          borderRadius="9999px"
          className="mr-3 bg-gray-800"
        />

        {/* 사용자 이름 스켈레톤 */}
        <div className="flex-1">
          <Skeleton width="30%" height="1rem" className="mb-1 bg-gray-800" />
          <Skeleton width="20%" height="0.75rem" className="bg-gray-800" />
        </div>
      </div>

      {/* 댓글 내용 스켈레톤 */}
      <div className="mt-2">
        <Skeleton height="0.875rem" className="mb-1 bg-gray-800" />
        <Skeleton height="0.875rem" width="90%" className="bg-gray-800" />
      </div>
    </div>
  );
};

export default CommentSkeleton;
