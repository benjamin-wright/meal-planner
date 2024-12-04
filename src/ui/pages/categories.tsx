import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Page } from "../components/page";
import { CategoriesLoaderResult } from "./categories-loader";
import { CategoryView } from "../components/category-view";
import { Category } from "../../database/schemas";
import { Reorder, useDragControls } from "motion/react";
import { DetailViewGroup } from "../components/detail-view";
import { Database } from "../../database";

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
  const data = useLoaderData() as CategoriesLoaderResult;
  const [items, setItems] = useState(data.categories);
  const [working, setWorking] = useState(false);
  const [handle, setHandle] = useState<number | null>(null);

  function persistUpdates() {
    setTimeout(() => {
      setWorking(false);
    }, 2000);
  }

  function onSetItems(newItems: Category[]) {
    if (working) {
      return;
    }
  
    if (handle) {
      clearTimeout(handle);
    }
    
    setItems(newItems);
    setHandle(setTimeout(() => {
      setHandle(null);
      setWorking(true);
      persistUpdates();
    }, 1000))
  }

  function onEdit(category: Category) {
    console.log("Edit", category);
  }

  function onDelete(category: Category) {
    console.log("Delete", category);
  }

  return (
    <Page title="Categories">
      <Reorder.Group axis="y" values={items} onReorder={onSetItems}>
        <DetailViewGroup>
          {items.map((category: Category) => (
            <ReorderItem key={category.id} category={category} onDelete={onDelete} onEdit={onEdit} working={working} />
          ))}
        </DetailViewGroup>
      </Reorder.Group>
    </Page>
  );
}
