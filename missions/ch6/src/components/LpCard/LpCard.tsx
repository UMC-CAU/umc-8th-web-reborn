import { useNavigate } from "react-router-dom";
import { Lp } from "../../types/lp";
import { useEffect, useState } from "react";

interface LpCardProps {
    lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string>("https://via.placeholder.com/400x200?text=이미지+로딩중");
  const baseUrl = import.meta.env.VITE_SERVER_API_URL || "http://localhost:8000";

  // 디버깅용: 컴포넌트 마운트 시 LP 데이터와 이미지 URL 확인
  useEffect(() => {
    console.log(`LP Card ${lp.id} 데이터:`, lp);
  }, [lp]);

  // 이미지 URL 처리
  useEffect(() => {
    if (!lp.thumbnail) {
      console.log(`LP Card ${lp.id}: 썸네일 없음, 대체 이미지 사용`);
      setImageUrl("https://via.placeholder.com/400x200?text=이미지+없음");
      return;
    }

    // 이미 http로 시작하는 완전한 URL인지 확인
    if (lp.thumbnail.startsWith('http://') || lp.thumbnail.startsWith('https://')) {
      console.log(`LP Card ${lp.id}: 완전한 URL 사용`, lp.thumbnail);
      setImageUrl(lp.thumbnail);
    } else {
      // 상대 경로인 경우 기본 URL 추가
      const newImageUrl = `${baseUrl}${lp.thumbnail.startsWith('/') ? '' : '/'}${lp.thumbnail}`;
      console.log(`LP Card ${lp.id} 이미지 URL 처리:`, lp.thumbnail, "->", newImageUrl);
      setImageUrl(newImageUrl);
    }
  }, [lp.thumbnail, baseUrl, lp.id]);

  const handleClick = () => {
    navigate(`/lp/${lp.id}`);
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
    <div
      className="group relative bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      onClick={handleClick}
    >
      {/* 이미지 컨테이너 */}
      <div className="relative h-48 w-full overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={lp.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error(`이미지 로딩 실패 (${lp.id}): ${imageUrl}`);
              // 이미지 로드 실패 시 대체 이미지 표시
              e.currentTarget.src = "https://via.placeholder.com/400x200?text=이미지+로드+실패";
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">이미지 없음</span>
          </div>
        )}
        {/* 호버 시 오버레이 */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            자세히 보기
          </span>
        </div>
      </div>

      {/* 텍스트 콘텐츠 */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {lp.title}
        </h3>
        <div className="text-sm text-gray-600">
          <span>{formatDate(lp.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default LpCard; 