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
import defaultData from "../assets/defaults.json";

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
    const parsed = JSON.parse(data) as ExportedData;
    await loadDataFile(parsed, units, categories, ingredients, recipies, meals);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function initData(
  units: UnitStore,
  categories: CategoryStore,
  ingredients: IngredientStore,
  recipies: RecipieStore,
  meals: MealStore
): Promise<void> {
  try {
    const data = defaultData as ExportedData;
    await loadDataFile(data, units, categories, ingredients, recipies, meals);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function loadDataFile(
  data: ExportedData,
  units: UnitStore,
  categories: CategoryStore,
  ingredients: IngredientStore,
  recipies: RecipieStore,
  meals: MealStore
): Promise<void> {
  await units.clear();
    if (data.units) {
      for (let i = 0; i < data.units.length; i++) {
        await units.put(data.units[i]);
      }
    }

    await categories.clear();
    if (data.categories) {
      for (let i = 0; i < data.categories.length; i++) {
        await categories.put(data.categories[i]);
      }
    }

    await ingredients.clear();
    if (data.ingredients) {
      for (let i = 0; i < data.ingredients.length; i++) {
        await ingredients.put(data.ingredients[i]);
      }
    }

    await recipies.clear();
    if (data.recipies) {
      for (let i = 0; i < data.recipies.length; i++) {
        await recipies.put(data.recipies[i]);
      }
    }

    await meals.clear();
    if (data.meals) {
      for (let i = 0; i < data.meals.length; i++) {
        await meals.put(data.meals[i]);
      }
    }
}