import { useContext, useEffect, useState } from "react";
import { CategoriesView } from "./categories-view";
import { DBContext } from "../../../providers/database";
import { Category } from "../../../../models/categories";


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

  return (
    <CategoriesView categories={categories} />
  );
}
