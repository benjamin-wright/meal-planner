import { useContext, useEffect } from "react";
import { DBContext } from "../providers/database/db-context";
import { useSavedState } from "./useSavedState";
import { Category } from "../../models/categories";
import { cacheId } from "./useIdCache";

export function useCategory(key: string, categoryId: number | null): [Category, (category: Category) => void, () => Promise<void>] {
  const { stores } = useContext(DBContext);
  const [category, setCategory] = useSavedState<Category>(key, {
    id: 0,
    order: 1,
    name: "",
  });

  useEffect(() => {
    if (!stores || !categoryId) {
      return;
    }

    const fetchCategory = async () => {
      const fetchedCategory = await stores.categoryStore.get(categoryId);
      if (fetchedCategory) {
        setCategory(fetchedCategory);
      }
    };

    fetchCategory();
  }, [categoryId, stores, setCategory]);

  async function save() {
    if (!stores) {
      return;
    }

    if (category.id) {
      await stores.categoryStore.put(category);
      cacheId("new-category", category.id);
    } else {
      const categories = await stores.categoryStore.getAll();
      category.order = categories.length;
      const id = await stores.categoryStore.add(category.name, category.order);
      cacheId("new-category", id);
    }
  }

  return [category, setCategory, save];
}
