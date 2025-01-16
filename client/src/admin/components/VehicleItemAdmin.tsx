import type { VehicleItemType } from "../types/itemType";

interface VehicleItemAdminProps {
  item: VehicleItemType;
}

export default function VehicleItemAdmin({ item }: VehicleItemAdminProps) {
  return <div>{item.model}</div>;
}
