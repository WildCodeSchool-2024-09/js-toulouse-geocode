import { createContext, useContext, useState } from "react";

interface UserType {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  sex: string;
  birthday: string;
  postalcode: string;
  hashed_password: string;
}

interface AuthType {
  token: string;
  user: UserType;
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
