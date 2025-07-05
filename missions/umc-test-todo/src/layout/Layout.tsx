import { Link, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function Layout() {
  const { username } = useAuthContext();

  return (
    <div>
      <div style={{ display: "flex", gap: "20px", margin: "20px" }}>
        <Link to="/">Home</Link>
        {username !== null ? (
          <Link to="/profile">프로필</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
