import { type ReactNode, createContext, useContext, useState } from "react";

interface ShowModifyModalContextType {
  displayUserModification: boolean;
  setDisplayUserModification: (value: boolean) => void;
  userId: number;
  setUserId: (value: number) => void;
}

const ShowModifyModalContext = createContext<ShowModifyModalContextType | null>(
  null,
);

export default function ShowModifyModalProvider({
  children,
}: { children: ReactNode }) {
  const [displayUserModification, setDisplayUserModification] = useState(false);
  const [userId, setUserId] = useState(0);
  return (
    <ShowModifyModalContext.Provider
      value={{
        displayUserModification,
        setDisplayUserModification,
        userId,
        setUserId,
      }}
    >
      {children}
    </ShowModifyModalContext.Provider>
  );
}

export const useModifyModal = () => {
  const context = useContext(ShowModifyModalContext);
  if (!context) {
    throw new Error("useShowNav must be used within a ShowNavProvider");
  }
  return context;
};
