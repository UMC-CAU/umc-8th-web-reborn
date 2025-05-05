import { useAuth } from "../context/AuthContext";

const MyPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          마이페이지
        </h1>
        
        <div className="flex items-center justify-center mb-8">
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt="프로필 이미지"
              className="w-32 h-32 rounded-full shadow-md"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center shadow-md">
              <span className="text-4xl text-gray-600">
                {user?.name?.charAt(0) || "?"}
              </span>
            </div>
          )}
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <dl className="divide-y divide-gray-200">
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">이름</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {user?.name || "미설정"}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">이메일</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {user?.email || "미설정"}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">가입일</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {user?.createdAt 
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "정보 없음"}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default MyPage; 