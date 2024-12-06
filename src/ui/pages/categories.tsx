import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Page } from "../components/page";
import { CategoriesLoaderResult } from "./categories-loader";
import { CategoryView } from "../components/category-view";
import { Category } from "../../database/schemas";
import { Reorder, useDragControls } from "motion/react";
import { DetailViewGroup } from "../components/detail-view";
import { Database } from "../../database";
import { NewItemButton } from "../components/new-item-button";
import { useNavigate } from "react-router-dom";
import { ConfirmDialog } from "../components/confirm-dialog";

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

interface CategoriesProps {
  database: Database;
}

export function Categories({ database }: CategoriesProps) {
  const navigate = useNavigate();
  const data = useLoaderData() as CategoriesLoaderResult;
  const [isOpen, setOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Category | null>(null);
  const [items, setItems] = useState(data.categories);

  async function onReorder(newItems: Category[]) {
    setItems(newItems);
    for (let i = 0; i < newItems.length; i++) {
      if (newItems[i].order === i) {
        continue;
      }
      
      newItems[i].order = i;
      await database.categories.put(newItems[i]);
    }
  }

  function onEdit(category: Category) {
    navigate(`/categories/${category.id}`);
  }

  function onDelete() {
    if (toDelete?.id === undefined) {
      return;
    }

    database.categories.delete(toDelete.id);
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
