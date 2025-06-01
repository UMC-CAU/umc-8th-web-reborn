import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const HomeLayout = () => {
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

export default HomeLayout;
