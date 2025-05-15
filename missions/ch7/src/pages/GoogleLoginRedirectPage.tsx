import { useEffect } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { LOCAL_STORAGE_KEYS } from "../constants/key"

const GoogleLoginRedirectPage = () => {
    const {setItem:setAccessToken} = useLocalStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)
    const {setItem:setRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEYS.REFRESH_TOKEN)

    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search)
        const accessToken = urlParams.get(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)
        const refreshToken = urlParams.get(LOCAL_STORAGE_KEYS.REFRESH_TOKEN)

        if(accessToken){
            setAccessToken(accessToken)
            setRefreshToken(refreshToken)
            window.location.href = "/my" 
        }
    },[setAccessToken,setRefreshToken])
    return (
        <div>
            구글 로그인 리다이렉트 화면 
        </div>
    )
}

export default GoogleLoginRedirectPage