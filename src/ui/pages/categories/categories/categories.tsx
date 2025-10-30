import { useContext, useEffect, useState } from "react";
import { CategoriesView } from "./categories-view";
import { DBContext } from "../../../providers/database";
import { Category } from "../../../../models/categories";
import { ActionQueue } from "../../../../utils/action-queue";

const queue = new ActionQueue();

export function Categories() {
  const { stores } = useContext(DBContext);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (!stores) return;

    (async () => {
      const categories = await stores.categoryStore.getAll();
      setCategories(categories);
    })();
  }, [stores]);

  function reorder(newOrder: Category[]) {
    if (!stores) return;
    for (let i = 0; i < newOrder.length; i++) {
      const newCategory = newOrder[i];
      if (newCategory.order === i) continue;

      newCategory.order = i;
      queue.enqueue(async () => {
        await stores.categoryStore.put(newCategory);
      });
    }

    setCategories(newOrder);
  }

  return (
    <CategoriesView
      categories={categories}
      onReorder={reorder}
      onEdit={() => {}}
      onDelete={() => {}}
    />
  );
}
