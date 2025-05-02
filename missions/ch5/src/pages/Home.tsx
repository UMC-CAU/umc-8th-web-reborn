import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {user?.profileImage && (
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            )}
            <h1 className="text-2xl font-bold text-gray-900">
              안녕하세요, {user?.name}님!
            </h1>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home; 