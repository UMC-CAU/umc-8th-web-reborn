import { createContext, PropsWithChildren, useContext } from "react";
import { RequestLoginDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LocalStorageKey } from "../constants/key";
import { postSignin, postLogout } from "../apis/auth";

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    login: (signInData: RequestLoginDto) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [accessToken, setAccessToken] = useLocalStorage<string | null>(LocalStorageKey.ACCESS_TOKEN, null);
    const [refreshToken, setRefreshToken] = useLocalStorage<string | null>(LocalStorageKey.REFRESH_TOKEN, null);

    const login = async (signInData: RequestLoginDto) => {
        try {
            const { data } = await postSignin(signInData);

        if (data) {
            const newAccessToken = data.accessToken;
            const newRefreshToken = data.refreshToken;

            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken);

                alert("로그인 성공");
            }
        } catch (error) {
            console.error("로그인 실패", error);
            alert("로그인 실패");
        }
    };

    const logout = async () => {
        try {
            await postLogout();
            setAccessToken(null);
            setRefreshToken(null);
            alert("로그아웃 성공");
        } catch (error) {
            console.error("로그아웃 실패", error);
            alert("로그아웃 실패");
        }
    };

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};


