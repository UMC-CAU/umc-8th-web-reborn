import {
  createBrowserRouter,
  type RouteObject,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LpDetailPage from "./pages/LpDetailPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartPage from "./pages/CartPage";

export const queryclient = new QueryClient();

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage /> },
      { path: "lps/:lpId", element: <LpDetailPage /> },
      { path: "cart", element: <CartPage /> },
    ],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "mypage",
        element: <MyPage />,
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

function App() {
  // VITE_SERVER_API_URL 환경 변수 설정 안내
  if (!import.meta.env.VITE_SERVER_API_URL) {
    console.error(
      "VITE_SERVER_API_URL 환경 변수가 설정되지 않았습니다.\n" +
        "프로젝트 루트에 .env 파일을 생성하고 다음 내용을 추가하세요:\n" +
        "VITE_SERVER_API_URL=http://localhost:8000",
    );
  } else {
    console.log("백엔드 서버 URL 확인됨:", import.meta.env.VITE_SERVER_API_URL);
  }

  return (
    <QueryClientProvider client={queryclient}>
      {/* 백엔드 주도 흐름에서는 GoogleOAuthProvider가 불필요합니다 */}
      {/* AuthProvider는 Zustand 스토어로 대체되었습니다. */}
      <div className="bg-netflixDark text-white">
        <RouterProvider router={router} />
      </div>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
