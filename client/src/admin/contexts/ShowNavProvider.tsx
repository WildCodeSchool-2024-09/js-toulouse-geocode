import { type ReactNode, createContext, useContext, useState } from "react";

interface ShowNavProviderType {
  navOpen: boolean;
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  navVisible: boolean;
  setNavVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowNavContext = createContext<ShowNavProviderType | null>(null);

export default function ShowNavProvider({ children }: { children: ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  return (
    <ShowNavContext.Provider
      value={{ navOpen, setNavOpen, navVisible, setNavVisible }}
    >
      {children}
    </ShowNavContext.Provider>
  );
}

export const useShowNav = () => {
  const context = useContext(ShowNavContext);
  if (!context) {
    throw new Error("useShowNav must be used within a ShowNavProvider");
  }
  return context;
};
