import { useState } from "react";
import { Category } from "../../../../models/categories";
import { Page } from "../../../components/layout/page/page";
import { AnimatePresence, motion, Reorder } from "framer-motion";
import { AddButton } from "../../../components/inputs/add-button/add-button";
import './categories-view.css'
import { SlideOutGroup } from "../../../components/containers/slide-out-controls/slide-out-group";
import { IconButton } from "../../../components/inputs/icon-button/icon-button";
import DragHandle from "../../../components/icons/drag-handle";
import { SlideOutControl } from "../../../components/containers/slide-out-controls/slide-out-control";
import { Dialog } from "../../../components/containers/dialog/dialog";

type Props = {
  categories: Category[];
  onReorder: (newOrder: Category[]) => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onNew: () => void;
};

export function CategoriesView({ categories, onReorder, onEdit, onDelete, onNew }: Props) {
  const [sorting, setSorting] = useState(false);
  const [toDelete, setToDelete] = useState<Category | undefined>(undefined);

  function sortingView() {
    return (
      <Reorder.Group axis="y" values={categories} onReorder={onReorder} className="categories-list" sx={{ overflowY: 'scroll' }}>
        {
          categories.map((category) => (
            <Reorder.Item
              key={category.id}
              value={category}
              className="category-item category-item-sortable glazing"
              style={{ touchAction: 'none' }}
              aria-label={`Category list item for ${category.name}`}
            >
              <IconButton icon={<DragHandle />} />
              <span>{category.name}</span>
            </Reorder.Item>
          )).concat(
            <li className="category-item">
              <AddButton id="add-category-button" onClick={onNew} disabled={sorting} />
            </li>
          )
        }
      </Reorder.Group>
    );
  }

  function fixedView() {
    return (
      <SlideOutGroup>
        <AnimatePresence>
          <ul className="categories-list">
            {
              categories.length === 0 ? (<></>) :
              categories.map((category) => (
                <motion.li key={category.id} className="category-item" aria-label={`Category list item for ${category.name}`} layout exit={{ opacity: 0 }}>
                  <SlideOutControl groupId={category.name} onEdit={() => onEdit(category)} onDelete={() => setToDelete(category)}>
                    {category.name}
                  </SlideOutControl>
                </motion.li>
              )).concat(
                <motion.li className="category-item" layout exit={{ opacity: 0 }} key="add-category">
                  <AddButton id="add-category-button" onClick={onNew} disabled={sorting} />
                </motion.li>
              )
            }
          </ul>
        </AnimatePresence>
      </SlideOutGroup>
    );
  }

  return (
    <Page title="Categories" onSorting={(sorting: boolean) => {
      setSorting(sorting);
    }}>
      { sorting ? sortingView() : fixedView() }
      <Dialog
        isOpen={!!toDelete}
        prompt="Are you sure you want to delete this category?"
        warning="This action cannot be undone."
        onClose={(accept: boolean) => {
          if (accept && toDelete) {
            onDelete(toDelete);
          }

          setToDelete(undefined);
        }}
      />
    </Page>
  );
}
