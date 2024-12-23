import { LoaderFunction } from "react-router-dom";
import { DB } from "../../../persistence/IndexedDB/db";
import { Ingredient } from "../../../models/ingredients";
import { Ingredients } from "../../../persistence/IndexedDB/ingredients";

export interface IngredientsLoaderResult {
  ingredients: Ingredient[];
}

export function ingredientsLoader({
  database,
}: {
  database: Promise<DB>;
}): LoaderFunction<IngredientsLoaderResult> {
  return async () => {
    const db = await database;
    const store = new Ingredients(db);
    const ingredients = await store.getAll();
    
    return { ingredients };
  };
}
