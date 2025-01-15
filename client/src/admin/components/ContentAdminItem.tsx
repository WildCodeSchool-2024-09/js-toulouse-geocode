import type { StationItemType } from "../types/itemType";

interface ContentAdminItemProps {
  item: StationItemType;
}

export default function ContentAdminItem({ item }: ContentAdminItemProps) {
  return <div style={{ color: "black" }}>{item.name}</div>;
}
