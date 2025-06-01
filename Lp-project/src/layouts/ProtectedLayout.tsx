import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProtectedLayout = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="flex flex-col pt-16">
        <main className="grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ProtectedLayout;
