import { LoaderFunction } from "react-router-dom";
import { CategoryStore } from "../../../persistence/interfaces/categories";
import { Category } from "../../../models/categories";
import { DB } from "../../../persistence/IndexedDB/db";
import { Categories } from "../../../persistence/IndexedDB/categories";
import { FormState } from "../../state/form-state";

export interface CategoriesEditLoaderResult {
  category: Category;
  isNew: boolean;
  categories: Category[];
  store: CategoryStore;
  forms: FormState;
}

export function categoriesEditLoader({
  database,
  forms,
}: {
  database: Promise<DB>;
  forms: FormState;
}): LoaderFunction<CategoriesEditLoaderResult> {
  return async ({ params }) => {
    const db = await database;
    const store = new Categories(db);
    const categories = await store.getAll();
    const isNew = params.category === undefined;

    const result = { categories, store, isNew, forms };

    if (params.category) {
      const category = await store.get(Number.parseInt(params.category, 10));
      return { category, ...result };
    }

    return { category: { id: 0, name: "", order: categories.length }, ...result };
  };
}
