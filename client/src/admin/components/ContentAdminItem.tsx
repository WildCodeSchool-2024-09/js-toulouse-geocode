import type { BaseItemType } from "../types/itemType";
import type {
  StationItemType,
  UserItemType,
  VehicleItemType,
} from "../types/itemType";
import StationItemAdmin from "./StationItemAdmin";
import UserItemAdmin from "./UserItemAdmin";
import VehicleItemAdmin from "./VehicleItemAdmin";

interface ContentAdminItemProps {
  item: BaseItemType;
  itemType: string;
}

export default function ContentAdminItem({
  item,
  itemType,
}: ContentAdminItemProps) {
  if (itemType === "stations") {
    const itemStation = item as StationItemType;
    return <StationItemAdmin item={itemStation} />;
  }
  if (itemType === "users") {
    const itemUser = item as UserItemType;
    return <UserItemAdmin item={itemUser} />;
  }
  if (itemType === "vehicles") {
    const itemVehicle = item as VehicleItemType;
    return <VehicleItemAdmin item={itemVehicle} />;
  }
}
