import { LoaderFunction } from "react-router-dom";
import { DB } from "../../../persistence/IndexedDB/db";
import { Ingredient } from "../../../models/ingredients";
import { Ingredients } from "../../../persistence/IndexedDB/ingredients";
import { IngredientStore } from "../../../persistence/interfaces/ingredients";
import { Categories } from "../../../persistence/IndexedDB/categories";
import { Category } from "../../../models/categories";

export interface IngredientsLoaderResult {
  ingredientsMap: Record<number, Ingredient[]>;
  categories: Category[];
  store: IngredientStore;
}

export function ingredientsLoader({
  database,
}: {
  database: Promise<DB>;
}): LoaderFunction<IngredientsLoaderResult> {
  return async () => {
    const db = await database;
    const store = new Ingredients(db);
    const categoryStore = new Categories(db);
    const ingredients = await store.getAll();
    const ingredientsMap: Record<number, Ingredient[]> = {};
    const categories: Category[] = [];

    for (const ingredient of ingredients) {
      if (ingredientsMap[ingredient.category] === undefined) {
        ingredientsMap[ingredient.category] = [];
        categories.push(await categoryStore.get(ingredient.category));
      }

      ingredientsMap[ingredient.category].push(ingredient);
    }

    categories.sort((a, b) => a.order - b.order);
    
    return { ingredientsMap, categories, store };
  };
}
