import { useContext, useEffect, useState } from "react";
import { Page } from "../../components/page";
import { DetailViewGroup } from "../../components/detail-view";
import { FloatingAddButton } from "../../components/floating-add-button";
import { useNavigate } from "react-router-dom";
import { ConfirmDialog } from "../../components/confirm-dialog";
import { Category } from "../../../models/categories";
import { DBContext } from "../../providers/database";
import { SortableCategory } from "./components/sortable-category";
import { Reorder } from "motion/react";
import { reorderCategories } from "../../../services/categories";

export function Categories() {
  const { categoryStore } = useContext(DBContext);

  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Category | null>(null);
  const [items, setItems] = useState<Category[]>([]);

  async function load() {
    if (!categoryStore) {
      return;
    }

    const categories = await categoryStore.getAll();
    setItems(categories);
  }

  useEffect(() => {
    load();
  }, [categoryStore]);

  async function onReorder(newItems: Category[]) {
    setItems(newItems);
    if (categoryStore) { await reorderCategories(newItems, categoryStore) }
  }

  function onEdit(category: Category) {
    navigate(`/categories/${category.id}`);
  }

  function onDelete() {
    if (toDelete?.id === undefined) {
      return;
    }

    categoryStore?.delete(toDelete.id);
    setOpen(false);
    setItems(items.filter((category) => category.id !== toDelete.id));
  }

  return (
    <Page title="Categories" returnTo="/data" showNav>
      <Reorder.Group axis="y" values={items} onReorder={onReorder} layoutScroll style={{ overflowY: "scroll" }}>
        <DetailViewGroup>
          {items.map((category: Category) => (
            <SortableCategory key={category.id} category={category} onDelete={() => {
              setToDelete(category);
              setOpen(true);
            }} onEdit={onEdit} />
          ))}
        </DetailViewGroup>
      </Reorder.Group>
      <FloatingAddButton to="/categories/new" />
      <ConfirmDialog
        message={`Deleting "${toDelete?.name}"`}
        open={isOpen}
        onConfirm={onDelete}
        onCancel={() => setOpen(false)}
      />
    </Page>
  );
}
