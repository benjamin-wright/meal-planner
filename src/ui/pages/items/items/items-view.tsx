import { Item } from "../../../../models/items";
import { Page } from "../../../components/layout/page/page";

export type ItemType = "all" | "edible" | "inedible" | "readymeal"

type Props = {
  items: Item[];
  itemType: ItemType;
  onItemTypeChanged: (type: ItemType) => void;
}

export function ItemsView({ items, itemType, onItemTypeChanged }: Props) {
  return <Page title="Items">
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  </Page>;
}