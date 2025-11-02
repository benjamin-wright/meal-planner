import { useState } from "react";
import { Item } from "../../../../models/items";
import { Page } from "../../../components/layout/page/page";

import "./items-view.css"
import Trash from "../../../components/icons/trash";
import { IconButton } from "../../../components/inputs/icon-button/icon-button";

export type ItemType = "all" | "edible" | "inedible" | "readymeal"

type Props = {
  items: Item[];
  itemType: ItemType;
  onItemTypeChanged: (type: ItemType) => void;
}

export function ItemsView({ items, itemType, onItemTypeChanged }: Props) {
  const [editMode, setEditMode] = useState(false);

  return <Page title="Items" onEdit={() => setEditMode(!editMode)}>
    <ul className="items-list">
      {items.map(item => (
        <li className="glazing" key={item.id}>
          <span>{item.name}</span>
          {editMode && (
            <IconButton icon={<Trash />} kind="error" label="Delete item" onClick={() => {
              // Handle delete item
            }} />
          )}
          {!editMode && (
            <span>&gt;</span>
          )}
        </li>
      ))}
    </ul>
  </Page>;
}