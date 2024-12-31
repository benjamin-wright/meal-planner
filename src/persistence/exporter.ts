import { Category } from "../models/categories";
import { Ingredient } from "../models/ingredients";
import { Recipie } from "../models/recipies";
import { Unit } from "../models/units";
import { CategoryStore } from "./interfaces/categories";
import { IngredientStore } from "./interfaces/ingredients";
import { RecipieStore } from "./interfaces/recipies";
import { UnitStore } from "./interfaces/units";

type ExportedData = {
  units: Unit[];
  categories: Category[];
  ingredients: Ingredient[];
  recipies: Recipie[];
};

export async function exportData(units: UnitStore, categories: CategoryStore, ingredients: IngredientStore, recipies: RecipieStore): Promise<string> {
  return JSON.stringify({
    units: await units.getAll(),
    categories: await categories.getAll(),
    ingredients: await ingredients.getAll(),
    recipies: await recipies.getAll(),
  });
}

export async function importData(units: UnitStore, categories: CategoryStore, ingredients: IngredientStore, recipies: RecipieStore, data: string): Promise<void> {
  const parsed = JSON.parse(data) as ExportedData;

  await units.clear();
  for (let i = 0; i < parsed.units.length; i++) {
    await units.put(parsed.units[i]);
  }

  await categories.clear();
  for (let i = 0; i < parsed.categories.length; i++) {
    await categories.put(parsed.categories[i]);
  }

  await ingredients.clear();
  for (let i = 0; i < parsed.ingredients.length; i++) {
    await ingredients.put(parsed.ingredients[i]);
  }

  await recipies.clear();
  for (let i = 0; i < parsed.recipies.length; i++) {
    await recipies.put(parsed.recipies[i]);
  }
}