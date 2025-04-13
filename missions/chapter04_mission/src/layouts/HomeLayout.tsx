import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HomeLayout() : React.ReactElement {
    return (
        <div className="flex flex-col items-center justify-center">
            <Navbar />
            <main className="flex-1 w-full">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
