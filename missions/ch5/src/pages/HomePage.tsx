import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // 로그인 상태가 아닐 때 보여줄 홈 화면
  const renderPublicHome = () => (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
        안녕하세요, 김덕환입니다.
      </h1>

      <div className="mb-8 flex justify-center">
        <img
          src="https://placehold.co/600x400/000000/FFF"
          alt="실습 이미지"
          className="rounded-lg shadow-md"
        />
      </div>

      <div className="mb-8 text-gray-700">
        <p className="mb-4">
          이 실습은 React와 TypeScript를 사용한 인증(Authentication) 기능 구현에
          관한 것입니다.
        </p>
        <p className="mb-4">주요 기능:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>로그인 / 회원가입</li>
          <li>Google 소셜 로그인</li>
          <li>토큰 기반 인증</li>
          <li>Protected Routes</li>
        </ul>
        <p>UMC 8기 웹 파트 챕터 5 실습을 통해 인증 구현의 기본을 배워봅시다!</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          로그인 페이지로
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          회원가입 페이지로
        </button>
        <button
          onClick={() => navigate("/mypage")}
          className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          마이페이지로
        </button>
      </div>
    </div>
  );

  // 로그인 상태일 때 보여줄 홈 화면
  const renderAuthenticatedHome = () => (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          {user?.profileImage && (
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          )}
          <h1 className="text-2xl font-bold text-gray-900">
            안녕하세요, {user?.name || "사용자"}님!
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/mypage")}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
          >
            마이페이지
          </button>
          <button
            onClick={logout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            로그아웃
          </button>
        </div>
      </div>

      <div className="mb-8 flex justify-center">
        <img
          src="https://placehold.co/600x400?text=Hello\nWorld"
          alt="환영 이미지"
          className="rounded-lg shadow-md"
        />
      </div>

      <div className="text-gray-700">
        <p className="mb-4 text-center">
          로그인에 성공하셨습니다! 이제 보호된 콘텐츠를 볼 수 있습니다.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {user ? renderAuthenticatedHome() : renderPublicHome()}
    </div>
  );
};

export default Home;
