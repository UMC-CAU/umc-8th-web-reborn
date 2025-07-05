import { login } from "../apis/auth";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { setUsername } = useAuthContext();
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const user = await login({
        username: String(formdata.username),
        password: String(formdata.password),
      });
      setUsername(user.username);

      navigate("/");
    } catch (e) {
      alert("로그인 실패");
    }
    console.log(e);
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">username</label>
        <input id="username" type="text" name="username" required />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input id="password" type="password" name="password" required />
      </div>
      <button type="submit">로그인</button>
    </form>
  );
}

export default LoginPage;
