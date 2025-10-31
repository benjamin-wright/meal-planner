import { useContext, useEffect, useState } from "react";
import { CategoriesView } from "./categories-view";
import { DBContext } from "../../../providers/database";
import { Category } from "../../../../models/categories";
import { ActionQueue } from "../../../../utils/action-queue";
import { useNavigate } from "react-router-dom";

const queue = new ActionQueue();

export function Categories() {
  const navigate = useNavigate();
  const { stores } = useContext(DBContext);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (!stores) return;

    (async () => {
      const categories = await stores.categoryStore.getAll();
      setCategories(categories);
    })();
  }, [stores]);

  function handleReorder(newOrder: Category[]) {
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

  function handleDelete(category: Category) {
    if (!stores) return;
    queue.enqueue(async () => {
      await stores.categoryStore.delete(category.id);
    });
    handleReorder(categories.sort((a, b) => a.order - b.order).filter(c => c.id !== category.id));
  }

  return (
    <CategoriesView
      categories={categories}
      onReorder={handleReorder}
      onEdit={category => navigate(`/categories/${category.id}`)}
      onDelete={handleDelete}
      onNew={() => navigate('/categories/new')}
    />
  );
}
