import Skeleton from './Skeleton';

const LpCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* 이미지 스켈레톤 */}
      <div className="relative h-48 w-full">
        <Skeleton height="100%" width="100%" />
      </div>

      {/* 콘텐츠 스켈레톤 */}
      <div className="p-4">
        {/* 제목 스켈레톤 */}
        <Skeleton height="1.5rem" className="mb-2" />
        
        {/* 날짜 및 좋아요 스켈레톤 */}
        <div className="flex justify-between items-center">
          <Skeleton width="30%" height="1rem" />
          <Skeleton width="20%" height="1rem" />
        </div>
      </div>
    </div>
  );
};

export default LpCardSkeleton; 