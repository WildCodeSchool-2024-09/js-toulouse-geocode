import { type ReactNode, createContext, useContext, useState } from "react";
import type {
  StationItemType,
  UserItemType,
  VehicleItemType,
} from "../types/itemType";

type ItemType = StationItemType | UserItemType | VehicleItemType | null;
interface ShowModalContextType {
  displayModification: boolean;
  setDisplayModification: (value: boolean) => void;
  displayDeleteModal: boolean;
  setDisplayDeleteModal: (value: boolean) => void;
  item: ItemType;
  setItem: (value: ItemType) => void;
  isRefresh: boolean;
  setIsRefresh: (value: boolean) => void;
}

const ShowModalContext = createContext<ShowModalContextType | null>(null);

export default function ShowModalProvider({
  children,
}: { children: ReactNode }) {
  const [displayModification, setDisplayModification] = useState(false);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const [item, setItem] = useState<ItemType>(null);
  const [isRefresh, setIsRefresh] = useState(false);
  return (
    <ShowModalContext.Provider
      value={{
        displayModification,
        setDisplayModification,
        displayDeleteModal,
        setDisplayDeleteModal,
        item,
        setItem,
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
