import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface AuthType {
  token: string;
  user_id: number;
}

interface AuthContextType {
  auth: AuthType | null;
  setAuth: (auth: AuthType) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({
  children,
}: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthType | null>(null);

  const memoAuth = useMemo(
    () => ({
      auth,
      setAuth,
    }),
    [auth],
  );

  useEffect(() => {
    if (auth) {
      return;
    }

    console.info("test authentication by fetching auth.");
    fetch(`${import.meta.env.VITE_API_URL}/api/auth`, {
      method: "GET",
      credentials: "include",
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setAuth({ token: "", user_id: data.user_id });
        });
      }
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={memoAuth}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
