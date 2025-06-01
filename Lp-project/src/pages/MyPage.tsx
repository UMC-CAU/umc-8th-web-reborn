import React, { useEffect } from "react";
import { useAuthStore } from "../store/authStore"; // Zustand 스토어 훅 임포트
import { Navigate } from "react-router-dom"; // Navigate 컴포넌트 임포트
import CocktailIcon from "../assets/cocktail-svgrepo-com.svg"; // 대체 이미지 임포트

const MyPage: React.FC = () => {
  const { isAuthenticated, user, fetchUser } = useAuthStore(); // Zustand 스토어에서 상태 및 액션 가져오기

  useEffect(() => {
    // 사용자가 인증되었지만 사용자 정보가 로드되지 않은 경우
    if (isAuthenticated && !user) {
      fetchUser(); // 사용자 정보 가져오는 액션 호출
    }
  }, [isAuthenticated, user, fetchUser]); // isAuthenticated, user, fetchUser가 변경될 때마다 실행

  return (
    <div className="container mx-auto p-6 text-white mt-16">
      <h1 className="text-3xl font-bold mb-8 text-center">마이 페이지</h1>
      {/* 사용자 정보 표시 */}
      {user ? (
        <div className="bg-gray-900 p-8 rounded-lg shadow-xl space-y-6">
          <div className="flex items-center space-x-6">
            {/* 프로필 이미지 또는 대체 이미지 표시 */}
            <img
              src={user.profileImage || CocktailIcon}
              alt="프로필 이미지"
              className="w-20 h-20 rounded-full object-cover border-2 border-red-500"
            />
            <div>
              <p className="text-xl font-semibold text-white">{user.name} 님</p>
              <p className="text-gray-400">{user.email}</p>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6 space-y-4">
            <h2 className="text-2xl font-bold text-white">추가 정보</h2>
            <p>
              <strong className="text-gray-400">소개:</strong>{" "}
              {user.bio || "작성된 소개가 없습니다."}
            </p>
            {/* 필요한 추가 정보 표시 */}
          </div>

          <div className="mt-8">
            <button
              // onClick={() => navigate('/edit-profile')}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
            >
              개인 정보 수정
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-400">
          사용자 정보를 불러오는 중입니다...
        </p>
      )}
    </div>
  );
};

export default MyPage;
