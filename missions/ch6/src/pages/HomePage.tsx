import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { PAGINATION_ORDER } from "../enums/common";
import LpCard from "../components/LpCard/LpCard";
import Sidebar from "../components/Sidebar";
import { useInView } from "react-intersection-observer";
import { useGetInfiniteLpList } from "../hooks/queries/useGetInfiniteLpList";
import LpCardSkeleton from "../components/LpCard/LpCardSkeleton";
import { Lp } from "../types/lp";

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.DESC);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // React Query 무한 스크롤 사용
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    isFetching,
  } = useGetInfiniteLpList({
    order: sortOrder,
    limit: 8,
  });

  // IntersectionObserver ref for infinite scrolling
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // 관찰 대상이 화면에 보일 때 다음 페이지 로드
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 에러 처리
  useEffect(() => {
    if (isError) {
      setErrorMessage("LP 목록을 불러오는데 실패했습니다.");
    } else {
      setErrorMessage(null);
    }
  }, [isError]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // 정렬 순서 변경 핸들러
  const handleSortChange = () => {
    setSortOrder(
      sortOrder === PAGINATION_ORDER.DESC
        ? PAGINATION_ORDER.ASC
        : PAGINATION_ORDER.DESC
    );
  };

  // 데이터 확인용 로그
  useEffect(() => {
    if (data) {
      console.log("받아온 LP 데이터:", JSON.stringify(data, null, 2));
    }
  }, [data]);

  const getLps = () => {
    if (!data || !data.pages || !data.pages.length) return [];
    
    try {
      return data.pages.flatMap(page => {
        // data.data 형태로 가정하고 타입을 무시하고 접근
        const lpsData = page.data?.data || [];
        return Array.isArray(lpsData) ? lpsData : [];
      });
    } catch (error) {
      console.error("LP 데이터 파싱 에러:", error);
      return [];
    }
  };

  const lps = getLps();
  const hasLps = lps.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-md fixed w-full top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            SpinningSpinning Dolimpan
          </h1>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="text-gray-700">
                {user?.name}님 반갑습니다.
              </div>
            ) : (
              <div></div>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* 사이드바 */}
      <Sidebar isOpen={isOpen} onClose={toggleSidebar} />

      {/* 메인 콘텐츠 */}
      <main className="pt-20 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* 정렬 옵션 */}
          <div className="flex justify-end mb-6">
            <button
              onClick={handleSortChange}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
            >
              {sortOrder === PAGINATION_ORDER.DESC ? "최신순" : "오래된순"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    sortOrder === PAGINATION_ORDER.DESC
                      ? "M3 4h13M3 8h9M3 12h5M13 12L17 8m0 0l-4-4m4 4H9"
                      : "M3 4h13M3 8h9M3 12h5M13 12L17 16m0 0l-4 4m4-4H9"
                  }
                />
              </svg>
            </button>
          </div>

          {/* LP 카드 목록 */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <LpCardSkeleton key={index} />
              ))}
            </div>
          ) : errorMessage ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-red-600 mb-4">
                {errorMessage}
              </h2>
              <p className="text-gray-600">
                잠시 후 다시 시도해주세요.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {lps.map((lp, index) => (
                  <LpCard 
                    key={lp?.id || index} 
                    lp={lp as unknown as Lp}
                  />
                ))}
              </div>

              {/* 로딩 인디케이터 */}
              {(isFetching || isFetchingNextPage) && !isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <LpCardSkeleton key={index} />
                  ))}
                </div>
              )}

              {/* 무한 스크롤 트리거 */}
              {hasNextPage && (
                <div
                  ref={ref}
                  className="h-10 flex items-center justify-center my-6"
                >
                  {isFetchingNextPage}
                </div>
              )}

              {/* 더 이상 데이터가 없는 경우 */}
              {!hasNextPage && !isLoading && hasLps && (
                <div className="text-center text-gray-500 mt-8">
                  더 이상 표시할 LP가 없습니다.
                </div>
              )}

              {/* 데이터가 없는 경우 */}
              {!isLoading && !hasLps && (
                <div className="text-center py-12">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    표시할 LP가 없습니다.
                  </h2>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
