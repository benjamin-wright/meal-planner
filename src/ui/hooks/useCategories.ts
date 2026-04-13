import { useContext, useEffect, useState } from "react";
import { DBContext } from "../providers/database/db-context";
import { Category } from "../../models/categories";
import { ActionQueue } from "../../utils/action-queue";

const queue = new ActionQueue();

export function useCategories(): [Category[], (newOrder: Category[]) => void, (category: Category) => void] {
  const { stores } = useContext(DBContext);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (!stores) return;

    (async () => {
      const categories = await stores.categoryStore.getAll();
      setCategories(categories);
    })();
  }, [stores]);

  function reorderCategories(newOrder: Category[]) {
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

  function deleteCategory(category: Category) {
    if (!stores) return;
    queue.enqueue(async () => {
      await stores.categoryStore.delete(category.id);
    });
    reorderCategories(categories.sort((a, b) => a.order - b.order).filter(c => c.id !== category.id));
  }

  return [categories, reorderCategories, deleteCategory];
}
