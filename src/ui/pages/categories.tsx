import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Page } from "../components/page";
import { CategoriesLoaderResult } from "./categories-loader";
import { CategoryView } from "../components/category-view";
import { Category } from "../../database/schemas";
import { Reorder, useDragControls } from "motion/react";
import { DetailViewGroup } from "../components/detail-view";

interface ReorderItemProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

function ReorderItem({ category, onEdit, onDelete }: ReorderItemProps) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item key={category.id} value={category} dragListener={false} dragControls={dragControls}>
      <CategoryView category={category} onEdit={onEdit} onDelete={onDelete} dragControls={dragControls} />
    </Reorder.Item>
  );
}

export function Categories() {
  const data = useLoaderData() as CategoriesLoaderResult;
  const [items, setItems] = useState(data.categories);

  function onSetItems(newItems: Category[]) {
    setItems(newItems);
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
        <DetailViewGroup title="Categories">
          {items.map((category: Category) => (
            <ReorderItem key={category.id} category={category} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </DetailViewGroup>
      </Reorder.Group>
    </Page>
  );
}
