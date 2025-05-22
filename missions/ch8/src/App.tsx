import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import ProtectedLayout from "./layouts/PretectedLayout";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LpDetailPage from "./pages/LpDetailPage";
import ThrottlePage from "./pages/ThrottlePage";
import { HomeLayout } from "./layouts/HomeLayout";

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
      { path: "lps/:lpId", element: <LpDetailPage /> },
      { path: "throttle", element: <ThrottlePage /> },
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
  // Google Client ID 가져오기
  // const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // 환경 변수가 설정되어 있는지 확인하고 콘솔에 기록
  // if (!googleClientId) {
  //   console.error(
  //     "Google 로그인이 비활성화되었습니다. VITE_GOOGLE_CLIENT_ID 환경 변수가 설정되지 않았습니다.\n" +
  //       "프로젝트 루트에 .env 파일을 생성하고 다음 내용을 추가하세요:\n" +
  //       "VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com\n" +
  //       "VITE_GOOGLE_REDIRECT_URI=http://localhost:5173/v1/auth/google/callback\n" +
  //       "VITE_SERVER_API_URL=http://localhost:8000",
  //   );
  // } else {
  //   console.log(
  //     "Google 클라이언트 ID 확인됨:",
  //     googleClientId.substring(0, 5) + "...",
  //   );
  // }

  return (
    <QueryClientProvider client={queryclient}>
      {
        // googleClientId ? (
        // <GoogleOAuthProvider clientId={googleClientId}>
        // <AuthProvider>
        // <RouterProvider router={router} />
        // {import.meta.env.DEV && (
        // <ReactQueryDevtools initialIsOpen={false} />
        // )}
        // </AuthProvider>
        // </GoogleOAuthProvider>
        // ) : (
        // 클라이언트 ID가 없는 경우 Google 로그인 기능 없이 앱 렌더링
        <AuthProvider>
          <RouterProvider router={router} />
          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </AuthProvider>
        // )
      }
    </QueryClientProvider>
  );
}

export default App;
