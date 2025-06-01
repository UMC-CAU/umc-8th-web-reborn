import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { IoArrowBackOutline } from "react-icons/io5";

const Navbar = (): React.ReactElement => {
  const { isAuthenticated, signout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      await signout();
    } catch (error) {
      console.error("Signout failed:", error);
    }
  };

  return (
    <nav className="bg-black shadow-md fixed w-full z-10 border-b border-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-gray-200"
            aria-label="뒤로 가기"
          >
            <IoArrowBackOutline className="text-2xl text-gray-400 hover:text-gray-200" />
          </button>
          <Link to="/" className="text-2xl font-bold text-white">
            김덕환의 LP 쇼핑몰
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <Link
            to="/cart"
            className="flex items-center space-x-2 text-white hover:text-gray-400"
          >
            <span className="text-white">Cart</span>
          </Link>
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="text-white hover:text-gray-400">
                Login
              </Link>
              <Link to="/signup" className="text-white hover:text-gray-400">
                Signup
              </Link>
            </>
          ) : (
            <>
              <div className="text-gray-400">
                {isAuthenticated && user && user.name
                  ? `${user.name} 님`
                  : "로그인 안한 상태"}
              </div>
              <Link to="/mypage" className="text-white hover:text-gray-400">
                My Page
              </Link>
              <button
                onClick={handleSignout}
                className="text-white hover:text-gray-400"
              >
                Signout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
