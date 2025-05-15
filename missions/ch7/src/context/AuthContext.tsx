import { createContext, PropsWithChildren, useContext, useState } from "react"
import { RequestLoginDto, LoginResponse } from "../types/auth"
import { LOCAL_STORAGE_KEYS } from "../constants/key"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { postSignin,postLogout } from "../apis/auth"

export interface AuthContextType {
    accessToken: string | null
    refreshToken: string | null
    isAuthenticated: boolean
    login: (signinData: RequestLoginDto) => Promise<void>
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    login: async () => {},
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

    const login = async (signinData: RequestLoginDto) => {
        const response: LoginResponse = await postSignin(signinData)
        try{
            if(response){
                const newAccessToken = response.accessToken
                const newRefreshToken = response.refreshToken
    
                setAccessTokeninStorage(newAccessToken)
                setRefreshTokeninStorage(newRefreshToken)
    
                setAccessToken(newAccessToken)
                setRefreshToken(newRefreshToken)
            }
        }catch(error){
        console.error("로그인 오류",error)
        alert("로그인 실패")
        }
        alert("로그인 성공")
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