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
    console.log("Edit", category);
  }

  function onDelete(category: Category) {
    console.log("Delete", category);
  }

  return (
    <Page title="Categories">
      <Reorder.Group axis="y" values={items} onReorder={onReorder}>
        <DetailViewGroup>
          {items.map((category: Category) => (
            <ReorderItem key={category.id} category={category} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </DetailViewGroup>
      </Reorder.Group>
    </Page>
  );
}
