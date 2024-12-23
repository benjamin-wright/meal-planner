import { LoaderFunction } from "react-router-dom";
import { DB } from "../../../persistence/IndexedDB/db";
import { Ingredient } from "../../../models/ingredients";
import { Category } from "../../../models/categories";
import { Unit } from "../../../models/units";
import { Ingredients } from "../../../persistence/IndexedDB/ingredients";
import { Categories } from "../../../persistence/IndexedDB/categories";
import { Units } from "../../../persistence/IndexedDB/units";
import { IngredientStore } from "../../../persistence/interfaces/ingredients";

export interface IngredientsEditLoaderResult {
  object?: Ingredient;
  ingredients: Ingredient[];
  categories: Category[];
  units: Unit[];
  store: IngredientStore;
}

export function ingredientsEditLoader({
  database,
}: {
  database: Promise<DB>;
}): LoaderFunction<IngredientsEditLoaderResult> {
  return async ({ params }) => {
    const db = await database;
    const store = new Ingredients(db);
    const categoryStore = new Categories(db);
    const unitStore = new Units(db);

    const ingredients = await store.getAll();
    const categories = await categoryStore.getAll();
    const units = await unitStore.getAll();

    const result = { ingredients, categories, units, store };

    if (params.ingredient) {
      const object = await store.get(Number.parseInt(params.ingredient, 10));
      return { object, ...result };
    }

    return result;
  };
}
