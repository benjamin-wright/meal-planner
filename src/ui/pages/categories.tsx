import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Page } from "../components/page";
import { CategoriesLoaderResult } from "./categories-loader";
import { CategoryView } from "../components/category-view";
import { Category } from "../../database/schemas";
import { Reorder } from "motion/react";
import { DetailViewGroup } from "../components/detail-view";

export function Categories() {
  const data = useLoaderData() as CategoriesLoaderResult;
  const [items, setItems] = useState(data.categories);

  function onEdit(category: Category) {
    console.log("Edit", category);
  }

  function onDelete(category: Category) {
    console.log("Delete", category);
  }

  return (
    <Page title="Categories">
      <Reorder.Group axis="y" values={items} onReorder={setItems}>
        <DetailViewGroup title="Categories">
          {items.map((category: Category) => (
            <Reorder.Item key={category.id} value={category}>
              <CategoryView category={category} onEdit={onEdit} onDelete={onDelete} />
            </Reorder.Item>
          ))}
        </DetailViewGroup>
      </Reorder.Group>
    </Page>
  );
}
