import { Category } from "../models/categories";
import { Ingredient } from "../models/ingredients";
import { Meal } from "../models/meals";
import { Recipie } from "../models/recipies";
import { UnitProps } from "../models/units";
import { CategoryStore } from "./interfaces/categories";
import { IngredientStore } from "./interfaces/ingredients";
import { MealStore } from "./interfaces/meals";
import { RecipieStore } from "./interfaces/recipies";
import { UnitStore } from "./interfaces/units";
import defaultData from "../assets/defaults.json";
import { DB } from "./interfaces/db";
import { settings } from "../models/settings";
import { SettingsStore } from "./interfaces/settings";

export type ExportedData = {
  version: number;
  units?: UnitProps[];
  categories?: Category[];
  ingredients?: Ingredient[];
  recipies?: Recipie[];
  meals?: Meal[];
  settings?: settings;
};

export async function exportData(db: DB): Promise<string> {
  return JSON.stringify({
    units: await db.units().getAll(),
    categories: await db.categories().getAll(),
    ingredients: await db.ingredients().getAll(),
    recipies: await db.recipies().getAll(),
    meals: await db.meals().getAll(),
    settings: await db.settings().get(),
  });
}

export async function importData(db: DB, data: string): Promise<void> {
  const parsed = JSON.parse(data) as ExportedData;
  await loadDataFile(parsed, db.units(), db.categories(), db.ingredients(), db.recipies(), db.meals(), db.settings());
}

export async function initData(db: DB): Promise<void> {
  const data = defaultData as ExportedData;
  await loadDataFile(data, db.units(), db.categories(), db.ingredients(), db.recipies(), db.meals(), db.settings());
}

async function loadDataFile(
  data: ExportedData,
  units: UnitStore,
  categories: CategoryStore,
  ingredients: IngredientStore,
  recipies: RecipieStore,
  meals: MealStore,
  settings: SettingsStore
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

  console.info("Loading settings...");
  await settings.clear();
  if (data.settings) {
    await settings.put(data.settings);
  } else {
    throw new Error("Settings not found in the data file");
  }

  console.info("Data loaded successfully");
}
