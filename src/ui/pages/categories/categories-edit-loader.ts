import { LoaderFunction } from "react-router-dom";
import { CategoryStore } from "../../../persistence/interfaces/categories";
import { Category } from "../../../models/categories";
import { DB } from "../../../persistence/IndexedDB/db";
import { Categories } from "../../../persistence/IndexedDB/categories";

export interface CategoriesEditLoaderResult {
  object?: Category;
  categories: Category[];
  store: CategoryStore;
}

export function categoriesEditLoader({
  database,
}: {
  database: Promise<DB>;
}): LoaderFunction<CategoriesEditLoaderResult> {
  return async ({ params }) => {
    const db = await database;
    const store = new Categories(db);
    const categories = await store.getAll();

    if (params.category) {
      const object = await store.get(Number.parseInt(params.category, 10));
      return { object, categories, store };
    }

    return { categories, store };
  };
}
