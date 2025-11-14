import { useState } from "react";
import { Item } from "../../../../models/items";
import { Page } from "../../../components/layout/page/page";

import "./items-view.css"
import { AnimatePresence, motion } from "motion/react";
import { SlideOutGroup } from "../../../components/containers/slide-out-controls/slide-out-group";
import { SlideOutControl } from "../../../components/containers/slide-out-controls/slide-out-control";
import { Dialog } from "../../../components/containers/dialog/dialog";
import { ItemFilter } from "./components/item-filter";

type Props = {
  items: Item[];
  onDelete: (item: Item) => void;
  onEdit: (item: Item) => void;
}

export function ItemsView({ items, onDelete, onEdit }: Props) {
  const [ toDelete, setToDelete ] = useState<Item | undefined>(undefined);
  const [ filter, setFilter ] = useState({
    ingredients: false,
    readymeals: false,
    misc: false,
    search: ""
  });

  return <Page title="Items">
    <ItemFilter filter={filter} onFilterChange={setFilter} />
    <ul className="items-list">
      <SlideOutGroup>
        <AnimatePresence>
          {items.map(item => (
            <motion.li key={item.id} layout exit={{ opacity: 0 }} aria-label={`Item list item for ${item.name}`}>
              <SlideOutControl groupId={item.name} onEdit={() => onEdit(item)} onDelete={() => setToDelete(item)}>
                {item.name}
              </SlideOutControl>
            </motion.li>
          ))}
        </AnimatePresence>
      </SlideOutGroup>
    </ul>
    <Dialog
      isOpen={!!toDelete}
      prompt="Are you sure you want to delete this item?"
      warning="This action cannot be undone."
      onClose={(accept: boolean) => {
        if (accept && toDelete) {
          onDelete(toDelete);
        }

        setToDelete(undefined);
      }}
    />
  </Page>;
}
