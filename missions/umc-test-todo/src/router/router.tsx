import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import TodoList from "../components/TodoList";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import { useAuthContext } from "../context/AuthContext";
import { PropsWithChildren } from "react";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { username } = useAuthContext();
  if (username === null) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <TodoList />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
