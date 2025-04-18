import { Category } from "../models/categories";
import { Ingredient } from "../models/ingredients";
import { Meal } from "../models/meals";
import { Recipie } from "../models/recipies";
import { unit } from "../models/units";
import { CategoryStore } from "./interfaces/categories";
import { IngredientStore } from "./interfaces/ingredients";
import { MealStore } from "./interfaces/meals";
import { RecipieStore } from "./interfaces/recipies";
import { UnitStore } from "./interfaces/units";
import defaultData from "../assets/defaults.json";
import { DB } from "./interfaces/db";

export type ExportedData = {
  units?: unit[];
  categories?: Category[];
  ingredients?: Ingredient[];
  recipies?: Recipie[];
  meals?: Meal[];
};

export async function exportData(db: DB): Promise<string> {
  return JSON.stringify({
    units: await db.units().getAll(),
    categories: await db.categories().getAll(),
    ingredients: await db.ingredients().getAll(),
    recipies: await db.recipies().getAll(),
    meals: await db.meals().getAll(),
  });
}

export async function importData(db: DB, data: string): Promise<void> {
  const parsed = JSON.parse(data) as ExportedData;
  await loadDataFile(parsed, db.units(), db.categories(), db.ingredients(), db.recipies(), db.meals());
}

export async function initData(db: DB): Promise<void> {
  const data = defaultData as ExportedData;
  await loadDataFile(data, db.units(), db.categories(), db.ingredients(), db.recipies(), db.meals());
}

async function loadDataFile(
  data: ExportedData,
  units: UnitStore,
  categories: CategoryStore,
  ingredients: IngredientStore,
  recipies: RecipieStore,
  meals: MealStore
): Promise<void> {
  console.info("Loading units...");
  await units.clear();
  if (data.units) {
    for (let i = 0; i < data.units.length; i++) {
      await units.put(data.units[i]);
    }
  }

  console.info("Loading categories...");
  await categories.clear();
  if (data.categories) {
    for (let i = 0; i < data.categories.length; i++) {
      await categories.put(data.categories[i]);
    }
  }

  console.info("Loading ingredients...");
  await ingredients.clear();
  if (data.ingredients) {
    for (let i = 0; i < data.ingredients.length; i++) {
      await ingredients.put(data.ingredients[i]);
    }
  }

  console.info("Loading recipies...");
  await recipies.clear();
  if (data.recipies) {
    for (let i = 0; i < data.recipies.length; i++) {
      await recipies.put(data.recipies[i]);
    }
  }

  console.info("Loading meals...");
  await meals.clear();
  if (data.meals) {
    for (let i = 0; i < data.meals.length; i++) {
      await meals.put(data.meals[i]);
    }
  }

  console.info("Data loaded successfully");
}
