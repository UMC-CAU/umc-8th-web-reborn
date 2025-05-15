import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ProtectedLayout = () => {
    const {accessToken} = useAuth()

    if(!accessToken) {
        return <Navigate to="/" replace />
    }
    return <Outlet/>
}

export default ProtectedLayout