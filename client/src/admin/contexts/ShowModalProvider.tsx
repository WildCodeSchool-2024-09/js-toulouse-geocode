import { type ReactNode, createContext, useContext, useState } from "react";

interface ShowModalContextType {
  displayUserModification: boolean;
  setDisplayUserModification: (value: boolean) => void;
  displayUserDeleteModal: boolean;
  setDisplayUserDeleteModal: (value: boolean) => void;
  itemId: number | null;
  setItemId: (value: number | null) => void;
}

const ShowModalContext = createContext<ShowModalContextType | null>(null);

export default function ShowModalProvider({
  children,
}: { children: ReactNode }) {
  const [displayUserModification, setDisplayUserModification] = useState(false);
  const [displayUserDeleteModal, setDisplayUserDeleteModal] = useState(false);
  const [itemId, setItemId] = useState<number | null>(null);
  return (
    <ShowModalContext.Provider
      value={{
        displayUserModification,
        setDisplayUserModification,
        displayUserDeleteModal,
        setDisplayUserDeleteModal,
        itemId,
        setItemId,
      }}
    >
      {children}
    </ShowModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ShowModalContext);
  if (!context) {
    throw new Error("useShowNav must be used within a ShowNavProvider");
  }
  return context;
};
