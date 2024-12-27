import { LoaderFunction, useLocation } from "react-router-dom";
import { DB } from "../../../persistence/IndexedDB/db";
import { Ingredient } from "../../../models/ingredients";
import { Category } from "../../../models/categories";
import { Unit } from "../../../models/units";
import { Ingredients } from "../../../persistence/IndexedDB/ingredients";
import { Categories } from "../../../persistence/IndexedDB/categories";
import { Units } from "../../../persistence/IndexedDB/units";
import { IngredientStore } from "../../../persistence/interfaces/ingredients";
import { FormState } from "../../state/form-state";

export interface IngredientsEditLoaderResult {
  ingredient: Ingredient;
  isNew: boolean;
  ingredients: Ingredient[];
  categories: Category[];
  units: Unit[];
  store: IngredientStore;
  forms: FormState;
}

export function ingredientsEditLoader({
  database,
  forms
}: {
  database: Promise<DB>;
  forms: FormState;
}): LoaderFunction<IngredientsEditLoaderResult> {
  return async ({ params }) => {
    const db = await database;
    const store = new Ingredients(db);
    const categoryStore = new Categories(db);
    const unitStore = new Units(db);

    const ingredients = await store.getAll();
    const categories = await categoryStore.getAll();
    const units = await unitStore.getAll();
    const isNew = params.ingredient === undefined;
    
    const result = { ingredients, categories, units, store, isNew, forms};
    
    const formResult = forms.pop("ingredients");
    if (formResult) {
      console.info(formResult);
      const { form, response } = formResult;
      const ingredient = form.body as Ingredient;

      if (response) {
        switch (response.field) {
          case "category":
            ingredient.category = response.response as number;
            break;
          case "unit":
            ingredient.unit = response.response as number;
            break;
        }
      }

      return { ingredient, ...result };
    }
    
    if (params.ingredient) {
      const ingredient = await store.get(Number.parseInt(params.ingredient, 10));
      return { ingredient, ...result };
    }

    return { ingredient: { id: 0, name: "", category: 1, unit: 1 }, ...result };
  };
}
