import { sanitize as sanitizeCategory } from "../models/categories";
import { sanitize as sanitizeIngredient } from "../models/ingredients";
import { sanitize as sanitizeMeal } from "../models/meals";
import { sanitize as sanitizeReadyMeal } from "../models/readymeals";
import { sanitize as sanitizeRecipie } from "../models/recipies";
import { sanitize as sanitizeUnit } from "../models/units";
import { sanitize as sanitizeExtra } from "../models/extras";
import { CategoryStore } from "./interfaces/categories";
import { IngredientStore } from "./interfaces/ingredients";
import { MealStore } from "./interfaces/meals";
import { ReadyMealStore } from "./interfaces/readymeals";
import { RecipieStore } from "./interfaces/recipies";
import { UnitStore } from "./interfaces/units";
import defaultData from "../assets/defaults.json";
import { DB } from "./interfaces/db";
import { settings } from "../models/settings";
import { SettingsStore } from "./interfaces/settings";
import { ExtraStore } from "./interfaces/extras";

export type ExportedData = {
  version: number;
  units?: unknown[];
  categories?: unknown[];
  ingredients?: unknown[];
  readymeals?: unknown[];
  recipies?: unknown[];
  meals?: unknown[];
  extra?: unknown[];
  settings?: settings;
};

export async function exportData(db: DB): Promise<string> {
  return JSON.stringify({
    units: await db.units().getAll(),
    categories: await db.categories().getAll(),
    ingredients: await db.ingredients().getAll(),
    readymeals: await db.readymeals().getAll(),
    recipies: await db.recipies().getAll(),
    meals: await db.meals().getAll(),
    extra: await db.extra().getAll(),
    settings: await db.settings().get(),
  });
}

export async function importData(db: DB, data: string): Promise<void> {
  const parsed = JSON.parse(data) as ExportedData;
  await loadDataFile(parsed, db.units(), db.categories(), db.ingredients(), db.readymeals(), db.recipies(), db.meals(), db.extra(), db.settings());
}

export async function initData(db: DB): Promise<void> {
  const data = defaultData as ExportedData;
  await loadDataFile(data, db.units(), db.categories(), db.ingredients(), db.readymeals(), db.recipies(), db.meals(), db.extra(), db.settings());
}

async function loadDataFile(
  data: ExportedData,
  units: UnitStore,
  categories: CategoryStore,
  ingredients: IngredientStore,
  readymeals: ReadyMealStore,
  recipies: RecipieStore,
  meals: MealStore,
  extra: ExtraStore,
  settings: SettingsStore
): Promise<void> {
  console.info("Loading units...");
  await units.clear();
  if (data.units) {
    for (let i = 0; i < data.units.length; i++) {
      await units.put(sanitizeUnit(data.units[i]));
    }
  }

  console.info("Loading categories...");
  await categories.clear();
  if (data.categories) {
    for (let i = 0; i < data.categories.length; i++) {
      await categories.put(sanitizeCategory(data.categories[i]));
    }
  }

  console.info("Loading ingredients...");
  await ingredients.clear();
  if (data.ingredients) {
    for (let i = 0; i < data.ingredients.length; i++) {
      await ingredients.put(sanitizeIngredient(data.ingredients[i]));
    }
  }

  console.info("Loading recipies...");
  await recipies.clear();
  if (data.recipies) {
    for (let i = 0; i < data.recipies.length; i++) {
      await recipies.put(sanitizeRecipie(data.recipies[i]));
    }
  }

  console.info("Loading ready meals...");
  await readymeals.clear();
  if (data.readymeals) {
    for (let i = 0; i < data.readymeals.length; i++) {
      await readymeals.put(sanitizeReadyMeal(data.readymeals[i]));
    }
  }

  console.info("Loading meals...");
  await meals.clear();
  if (data.meals) {
    for (let i = 0; i < data.meals.length; i++) {
      await meals.put(sanitizeMeal(data.meals[i]));
    }
  }

  console.info("Loading extras...");
  await extra.clear();
  if (data.extra) {
    for (let i = 0; i < data.extra.length; i++) {
      await extra.put(sanitizeExtra(data.extra[i]));
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
