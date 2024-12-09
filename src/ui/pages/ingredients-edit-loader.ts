import { Database } from "../../database";
import { Category, Ingredient, Unit } from "../../database/schemas";
import { LoaderFunction } from "react-router-dom";

export interface IngredientsEditLoaderResult {
  object?: Ingredient;
  ingredients: Ingredient[];
  categories: Category[];
  units: Unit[];
}

export function ingredientsEditLoader({
  database,
}: {
  database: Database;
}): LoaderFunction<IngredientsEditLoaderResult> {
  return async ({ params }) => {
    const ingredients = await database.ingredients.getAll();
    const categories = await database.categories.getAll();
    const units = await database.units.getAll();

    const result = { ingredients, categories, units };

    if (params.ingredient) {
      const object = await database.ingredients.get(Number.parseInt(params.ingredient, 10));
      return { object, ...result };
    }

    return result;
  };
}
