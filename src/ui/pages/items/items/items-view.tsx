import { useState } from "react";
import { Item } from "../../../../models/items";
import { Page } from "../../../components/layout/page/page";

import "./items-view.css"
import Trash from "../../../components/icons/trash";
import { IconButton } from "../../../components/inputs/icon-button/icon-button";
import { AnimatePresence, motion } from "motion/react";

type Props = {
  items: Item[];
  onDelete: (item: Item) => void;
  onEdit: (item: Item) => void;
}

export function ItemsView({ items, onDelete, onEdit }: Props) {
  const [sorting, setSorting] = useState(false);

  function handleItemClick(item: Item) {
    if (sorting) {
      return;
    }
    onEdit(item);
  }

  return <Page title="Items" onSorting={() => setSorting(!sorting)}>
    <ul className="items-list">
      <AnimatePresence>
        {items.map(item => (
          <motion.li className="glazing" key={item.id} layout exit={{ opacity: 0 }} onClick={() => handleItemClick(item)}>
            <span>{item.name}</span>
            {sorting && (
              <IconButton
                icon={<Trash />}
                kind="error"
                label="Delete item"
                onClick={() => onDelete(item)}
              />
            )}
            {!sorting && (
              <span>&gt;</span>
            )}
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  </Page>;
}
