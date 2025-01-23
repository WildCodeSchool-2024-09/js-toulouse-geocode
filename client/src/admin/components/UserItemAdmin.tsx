import type { UserItemType } from "../types/itemType";

interface UserItemAdminProps {
  item: UserItemType;
}

export default function UserItemAdmin({ item }: UserItemAdminProps) {
  return <div>{item.firstname}</div>;
}
