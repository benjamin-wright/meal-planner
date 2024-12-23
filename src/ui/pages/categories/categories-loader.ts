import { LoaderFunction } from "react-router-dom";
import { CategoryStore } from "../../../persistence/interfaces/categories";
import { Category } from "../../../models/categories";
import { DB } from "../../../persistence/IndexedDB/db";
import { Categories } from "../../../persistence/IndexedDB/categories";

export interface CategoriesLoaderResult {
  categories: Category[];
  store: CategoryStore;
}

export function categoriesLoader({
  database,
}: {
  database: Promise<DB>;
}): LoaderFunction<CategoriesLoaderResult> {
  return async () => {
    const db = await database;
    const store = new Categories(db);
    const categories = await store.getAll();

    return { categories: categories.sort((a, b) => a.order - b.order), store: store };
  };
}
