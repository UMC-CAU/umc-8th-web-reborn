import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
    onClose();
  };

  return (
    <>
      {/* 사이드바 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* 사이드바 */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">메뉴</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav>
            <ul className="space-y-4">
              <li>
                <a
                  href="/"
                  className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded"
                >
                  홈
                </a>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <a
                      href="/mypage"
                      className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded"
                    >
                      마이페이지
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left py-2 px-4 text-red-600 hover:bg-gray-100 rounded"
                    >
                      로그아웃
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <a
                      href="/login"
                      className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded"
                    >
                      로그인
                    </a>
                  </li>
                  <li>
                    <a
                      href="/signup"
                      className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded"
                    >
                      회원가입
                    </a>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 