import { type ReactNode, createContext, useContext, useState } from "react";

interface ShowModalContextType {
  displayUserModification: boolean;
  setDisplayUserModification: (value: boolean) => void;
  displayStationModification: boolean;
  setDisplayStationModification: (value: boolean) => void;
  displayDeleteModal: boolean;
  setDisplayDeleteModal: (value: boolean) => void;
  itemId: number | null;
  setItemId: (value: number | null) => void;
  isRefresh: boolean;
  setIsRefresh: (value: boolean) => void;
}

const ShowModalContext = createContext<ShowModalContextType | null>(null);

export default function ShowModalProvider({
  children,
}: { children: ReactNode }) {
  const [displayUserModification, setDisplayUserModification] = useState(false);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const [displayStationModification, setDisplayStationModification] =
    useState(false);
  const [itemId, setItemId] = useState<number | null>(null);
  const [isRefresh, setIsRefresh] = useState(false);
  return (
    <ShowModalContext.Provider
      value={{
        displayUserModification,
        setDisplayUserModification,
        displayDeleteModal,
        setDisplayDeleteModal,
        displayStationModification,
        setDisplayStationModification,
        itemId,
        setItemId,
        isRefresh,
        setIsRefresh,
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
