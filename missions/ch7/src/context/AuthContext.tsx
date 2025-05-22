import { createContext, PropsWithChildren, useContext, useState } from "react"
import { ApiResponseWrapper, LoginData } from "../types/auth"
import { LOCAL_STORAGE_KEYS } from "../constants/key"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { postLogout } from "../apis/auth"

export interface AuthContextType {
    accessToken: string | null
    refreshToken: string | null
    isAuthenticated: boolean
    login: (data: ApiResponseWrapper<LoginData>) => void
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    login: () => {},
    logout: async () => {}
})

export const AuthProvider = ({children}:PropsWithChildren) => {
    const { getItem:getAccessTokenfromStorage,
         setItem:setAccessTokeninStorage,
          removeItem:removeAccessTokenfromStorage} = useLocalStorage<string | null>(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, null)
    const {getItem:getRefreshTokenfromStorage,
         setItem:setRefreshTokeninStorage,
          removeItem:removeRefreshTokenfromStorage} = useLocalStorage<string | null>(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, null)

    const [accessToken, setAccessToken] = useState<string|null>(getAccessTokenfromStorage())
    const [refreshToken, setRefreshToken] = useState<string|null>(getRefreshTokenfromStorage())
    const isAuthenticated = Boolean(accessToken)

    const login = (responseData: ApiResponseWrapper<LoginData>) => {
        try {
            const apiData = responseData.data;
            if (apiData && apiData.accessToken && apiData.refreshToken) {
                const newAccessToken = apiData.accessToken;
                const newRefreshToken = apiData.refreshToken;
                
                setAccessTokeninStorage(newAccessToken);
                setRefreshTokeninStorage(newRefreshToken);
                
                setAccessToken(newAccessToken);
                setRefreshToken(newRefreshToken);
                
                console.log("로그인 성공:", { accessToken: newAccessToken });
            } else {
                console.error("API 응답 데이터 구조 오류:", responseData);
                throw new Error("유효하지 않은 인증 데이터 구조");
            }
        } catch (error) {
            console.error("로그인 처리 오류", error);
            throw error;
        }
    }

    const logout = async ()=> {
        try{
            await postLogout()
            removeAccessTokenfromStorage()
            removeRefreshTokenfromStorage()

            setAccessToken(null)
            setRefreshToken(null)
        }catch(error){
            console.error("로그아웃 오류",error)
            alert("로그아웃 실패")
        }
        alert("로그아웃 성공")
    }
    return (
        <AuthContext.Provider value={{accessToken,refreshToken,isAuthenticated,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}