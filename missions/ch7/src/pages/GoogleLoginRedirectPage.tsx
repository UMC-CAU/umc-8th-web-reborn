import { useEffect } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { LOCAL_STORAGE_KEYS } from "../constants/key"

const GoogleLoginRedirectPage = () => {
    const {setItem:setAccessToken} = useLocalStorage<string | null>(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, null)
    const {setItem:setRefreshToken} = useLocalStorage<string | null>(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, null)

    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search)
        const accessToken = urlParams.get(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)
        const refreshToken = urlParams.get(LOCAL_STORAGE_KEYS.REFRESH_TOKEN)

        console.log("구글 로그인 리디렉트: URL 파라미터", {accessToken, refreshToken});

        if(accessToken){
            setAccessToken(accessToken)
            setRefreshToken(refreshToken)
            window.location.href = "/mypage"
        } else {
            console.error("구글 로그인 실패: 토큰이 URL 파라미터에 없습니다.");
        }
    },[setAccessToken,setRefreshToken])
    return (
        <div>
            구글 로그인 리다이렉트 화면 
        </div>
    )
}

export default GoogleLoginRedirectPage