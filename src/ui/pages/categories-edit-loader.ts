import { Database } from "../../database";
import { Category } from "../../database/schemas";
import { LoaderFunction } from "react-router-dom";

export interface CategoriesEditLoaderResult {
  object?: Category;
  categories: Category[];
}

export function categoriesEditLoader({
  database,
}: {
  database: Database;
}): LoaderFunction<CategoriesEditLoaderResult> {
  return async ({ params }) => {
    const categories = await database.categories.getAll();

    if (params.category) {
      const object = await database.categories.get(Number.parseInt(params.category, 10));
      return { object, categories };
    }

    return { categories };
  };
}
