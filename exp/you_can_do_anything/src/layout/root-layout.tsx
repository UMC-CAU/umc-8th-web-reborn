import {Outlet} from "react-router-dom";
import Navbar from "../components/navbar.tsx";

const RootLayout = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    );
};

export default RootLayout;
