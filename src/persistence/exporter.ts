import { Category } from "../models/categories";
import { Ingredient } from "../models/ingredients";
import { Meal } from "../models/meals";
import { Recipie } from "../models/recipies";
import { Unit } from "../models/units";
import { CategoryStore } from "./interfaces/categories";
import { IngredientStore } from "./interfaces/ingredients";
import { MealStore } from "./interfaces/meals";
import { RecipieStore } from "./interfaces/recipies";
import { UnitStore } from "./interfaces/units";

type ExportedData = {
  units?: Unit[];
  categories?: Category[];
  ingredients?: Ingredient[];
  recipies?: Recipie[];
  meals?: Meal[];
};

export async function exportData(units: UnitStore, categories: CategoryStore, ingredients: IngredientStore, recipies: RecipieStore, meals: MealStore): Promise<string> {
  return JSON.stringify({
    units: await units.getAll(),
    categories: await categories.getAll(),
    ingredients: await ingredients.getAll(),
    recipies: await recipies.getAll(),
    meals: await meals.getAll(),
  });
}

export async function importData(units: UnitStore, categories: CategoryStore, ingredients: IngredientStore, recipies: RecipieStore, meals: MealStore, data: string): Promise<void> {
  try {
    console.info(`JSON data: ${data}`);
    const parsed = JSON.parse(data) as ExportedData;

    await units.clear();
    if (parsed.units) {
      for (let i = 0; i < parsed.units.length; i++) {
        await units.put(parsed.units[i]);
      }
    }

    await categories.clear();
    if (parsed.categories) {
      for (let i = 0; i < parsed.categories.length; i++) {
        await categories.put(parsed.categories[i]);
      }
    }

    await ingredients.clear();
    if (parsed.ingredients) {
      for (let i = 0; i < parsed.ingredients.length; i++) {
        await ingredients.put(parsed.ingredients[i]);
      }
    }

    await recipies.clear();
    if (parsed.recipies) {
      for (let i = 0; i < parsed.recipies.length; i++) {
        await recipies.put(parsed.recipies[i]);
      }
    }

    await meals.clear();
    if (parsed.meals) {
      for (let i = 0; i < parsed.meals.length; i++) {
        await meals.put(parsed.meals[i]);
      }
    }
  
  } catch (err) {
    console.info(err);
    throw err;
  }
}
