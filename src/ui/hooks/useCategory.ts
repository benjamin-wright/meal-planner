import { useContext, useEffect } from "react";
import { DBContext } from "../providers/database/db-context";
import { useSavedState } from "./useSavedState";
import { Category } from "../../models/categories";

export function useCategory(key: string, categoryId: number | null): [Category, (category: Category) => void, () => void, () => Promise<void>] {
  const { stores } = useContext(DBContext);
  const [category, setCategory, clearCategory] = useSavedState<Category>(key, {
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
  }, [categoryId, stores]);

  async function save() {
    if (!stores) {
      return;
    }

    if (category.id) {
      stores.categoryStore.put(category);
    } else {
      stores.categoryStore.add(category.name, category.order);
    }
  }

  return [category, setCategory, clearCategory, save];
}
