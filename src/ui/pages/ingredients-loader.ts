import { Database } from "../../database";
import { Ingredient } from "../../database/schemas";
import { LoaderFunction } from "react-router-dom";

export interface IngredientsLoaderResult {
  ingredients: Ingredient[];
}

export function ingredientsLoader({
  database,
}: {
  database: Database;
}): LoaderFunction<IngredientsLoaderResult> {
  return async () => {
    const ingredients = await database.ingredients.getAll();
    return { ingredients };
  };
}
