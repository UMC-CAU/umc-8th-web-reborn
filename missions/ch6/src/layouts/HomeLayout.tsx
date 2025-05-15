import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useState } from "react"
import Sidebar from "../components/Sidebar"

const HomeLayout = () => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(v => !v)
    return (
        <div className="bg-sky-100">
            <Navbar/>
            <div className="h-dvh flex flex-col ">
            {isOpen && <Sidebar isOpen={isOpen} onClose={toggle}/>}
            <main
                    className={
                        `flex-1 p-4 transition-margin duration-300 ease-in-out ${
                            isOpen ? 'ml-64' : ''
                        }`
                    }
                >
                    <Outlet />
                </main>
        </div>
            <Footer/>
        </div>
    )
}

export default HomeLayout