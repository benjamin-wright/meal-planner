import { Database } from "../../database";
import { Category } from "../../database/schemas";
import { LoaderFunction } from "react-router-dom";

export interface CategoriesLoaderResult {
  categories: Category[];
}

export function categoriesLoader({
  database,
}: {
  database: Database;
}): LoaderFunction<CategoriesLoaderResult> {
  return async () => {
    const categories = await database.categories.getAll();
    return { categories };
  };
}
