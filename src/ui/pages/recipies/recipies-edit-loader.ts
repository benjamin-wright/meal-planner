import { LoaderFunction } from "react-router-dom";
import { DB } from "../../../persistence/IndexedDB/db";
import { Ingredient } from "../../../models/ingredients";
import { Ingredients } from "../../../persistence/IndexedDB/ingredients";
import { FormState } from "../../state/form-state";
import { Recipie } from "../../../models/recipies";
import { RecipieStore } from "../../../persistence/interfaces/recipies";
import { Recipies } from "../../../persistence/IndexedDB/recipies";

export interface RecipiesEditLoaderResult {
  recipie: Recipie;
  isNew: boolean;
  ingredients: Ingredient[];
  store: RecipieStore;
  forms: FormState;
}

export function recipiesEditLoader({
  database,
  forms
}: {
  database: Promise<DB>;
  forms: FormState;
}): LoaderFunction<RecipiesEditLoaderResult> {
  return async ({ params }) => {
    const db = await database;
    const store = new Recipies(db);
    const ingredientStore = new Ingredients(db);
    const ingredients = await ingredientStore.getAll();

    const isNew = params.recipie === undefined;
    const result = { ingredients, store, isNew, forms};
    
    if (params.recipie) {
      const recipie = await store.get(Number.parseInt(params.recipie, 10));
      return { recipie, ...result };
    }

    return { recipie: { id: 0, name: "", description: "", serves: 1, ingredients: [], steps: [] }, ...result };
  };
}
