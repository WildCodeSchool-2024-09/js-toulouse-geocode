import { createContext, useContext, useState } from "react";

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

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
