import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-10">
      <div className="flex items-center justify-between p-4">
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 dark:text-white"
        >
          SpinningSpinning Dolimpan
        </Link>
        <div className="space-x-6 flex items-center">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-gray-800 dark:text-white hover:text-gray-400 dark:hover:text-gray-600"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-gray-800 dark:text-white hover:text-gray-400 dark:hover:text-gray-600"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/mypage"
                className="text-gray-800 dark:text-white hover:text-gray-400 dark:hover:text-gray-600"
              >
                My Page
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-800 dark:text-white hover:text-gray-400 dark:hover:text-gray-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
