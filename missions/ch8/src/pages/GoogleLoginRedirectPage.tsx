import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default const GoogleLoginRedirectPage = () => {
    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search)
        const accessToken = urlParams.get(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)
        const refreshToken = urlParams.get(LOCAL_STORAGE_KEYS.REFRESH_TOKEN)
    },[])
  return (
    <div>GoogleLoginRedirectPage</div>
  )
}
