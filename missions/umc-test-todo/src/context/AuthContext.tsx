import { createContext, PropsWithChildren, useContext, useState } from "react";

interface AuthContextValue {
  username: string | null;
  setUsername: (username: string) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [username, setUsername] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (context == null) {
    throw new Error(
      "AuthContext를 찾을 수 없습니다. AuthProvider 컴포넌트를 확인해주세요.  "
    );
  }

  return context;
}
