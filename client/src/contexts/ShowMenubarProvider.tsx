import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface ShowMenubarContextType {
  showMenubar: boolean;
  setShowMenubar: (showMenubar: boolean) => void;
}

export const ShowMenubarContext = createContext<ShowMenubarContextType | null>(
  null,
);

export const ShowMenubarProvider = ({ children }: { children: ReactNode }) => {
  const [showMenubar, setShowMenubar] = useState(false);

  return (
    <ShowMenubarContext.Provider value={{ showMenubar, setShowMenubar }}>
      {children}
    </ShowMenubarContext.Provider>
  );
};

export const useShowMenubar = () => {
  const context = useContext(ShowMenubarContext);
  if (context === null) {
    throw new Error("useShowMenubar must be used within a ShowMenubarProvider");
  }
  return context;
};
