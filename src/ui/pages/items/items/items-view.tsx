import { useState } from "react";
import { Item, ItemKind } from "../../../../models/items";
import { Page } from "../../../components/layout/page/page";

import "./items-view.css"
import { AnimatePresence, motion } from "motion/react";
import { SlideOutGroup } from "../../../components/containers/slide-out-controls/slide-out-group";
import { SlideOutControl } from "../../../components/containers/slide-out-controls/slide-out-control";
import { Dialog } from "../../../components/containers/dialog/dialog";
import { ItemFilter } from "./components/item-filter";
import { Category } from "../../../../models/categories";

type Props = {
  items: Item[];
  categories: Category[];
  onDelete: (item: Item) => void;
  onEdit: (item: Item) => void;
}
  
export function ItemsView({ items, categories, onDelete, onEdit }: Props) {
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
          {items.filter(item => {
            if (filter.ingredients || filter.readymeals || filter.misc) {
              if (!filter.ingredients && item.kind === ItemKind.Ingredient) return false;
              if (!filter.readymeals && item.kind === ItemKind.Readymeal) return false;
              if (!filter.misc && item.kind === ItemKind.Misc) return false;
            }

            if (filter.search) {
              const searchLower = filter.search.toLowerCase();
              const category = categories.find(c => c.id === item.category)?.name || "";

              const nameMatches = item.name.toLowerCase().includes(searchLower);
              const categoryMatches = category.toLowerCase().includes(searchLower);

              console.log({ nameMatches, categoryMatches });

              return nameMatches || categoryMatches;
            }

            return true;
          }).map(item => (
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
