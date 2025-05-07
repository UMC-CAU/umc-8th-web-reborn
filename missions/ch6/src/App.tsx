import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";
import MyPage from "./pages/MyPage";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// 환경 변수에서 Google 클라이언트 ID 가져오기
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

// 클라이언트 ID가 없을 경우 경고 로그 출력
if (!GOOGLE_CLIENT_ID) {
  console.warn(
    "VITE_GOOGLE_CLIENT_ID가 설정되지 않았습니다. 구글 로그인이 작동하지 않을 수 있습니다.",
  );
  console.log("환경 변수:", import.meta.env);
}

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<HomePage />} />
            <Route
              path="/oauth/google/callback"
              element={<GoogleLoginRedirectPage />}
            />
            {/* 보호된 라우트 예시 */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <div>프로필 페이지 (로그인 필요)</div>
                </ProtectedRoute>
              }
            />
            {/* 마이페이지 - 인증이 필요한 페이지 */}
            <Route
              path="/mypage"
              element={
                <ProtectedRoute>
                  <MyPage />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
