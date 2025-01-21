import { useContext, useEffect, useState } from "react";
import { Page } from "../../components/page";
import { CategoryView } from "./components/category-view";
import { Reorder, useDragControls } from "motion/react";
import { DetailViewGroup } from "../../components/detail-view";
import { NewItemButton } from "../../components/new-item-button";
import { useNavigate } from "react-router-dom";
import { ConfirmDialog } from "../../components/confirm-dialog";
import { Category } from "../../../models/categories";
import { DBContext } from "../../providers/database";

interface ReorderItemProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  working?: boolean;
}

function ReorderItem({ category, onEdit, onDelete, working }: ReorderItemProps) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item key={category.id} value={category} dragListener={false} dragControls={dragControls}>
      <CategoryView category={category} onEdit={onEdit} onDelete={onDelete} dragControls={dragControls} working={working} />
    </Reorder.Item>
  );
}


export function Categories() {
  const {categoryStore} = useContext(DBContext);
  
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
    for (let i = 0; i < newItems.length; i++) {
      if (newItems[i].order === i) {
        continue;
      }
      
      newItems[i].order = i;
      await categoryStore?.put(newItems[i]);
    }
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
    <Page title="Categories">
      <Reorder.Group axis="y" values={items} onReorder={onReorder}>
        <DetailViewGroup>
          {items.map((category: Category) => (
            <ReorderItem key={category.id} category={category} onDelete={() => {
              setToDelete(category);
              setOpen(true);
            }} onEdit={onEdit} />
          ))}
        </DetailViewGroup>
      </Reorder.Group>
      <NewItemButton to="/categories/new" />
      <ConfirmDialog      
        message={`Deleting "${toDelete?.name}"`}
        open={isOpen}
        onConfirm={onDelete}
        onCancel={() => setOpen(false)}
      />
    </Page>
  );
}
