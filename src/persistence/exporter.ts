import { Category } from "../models/categories";
import { Ingredient } from "../models/ingredients";
import { Unit } from "../models/units";
import { CategoryStore } from "./interfaces/categories";
import { IngredientStore } from "./interfaces/ingredients";
import { UnitStore } from "./interfaces/units";

type ExportedData = {
  units: Unit[];
  categories: Category[];
  ingredients: Ingredient[];
};

export async function exportData(units: UnitStore, categories: CategoryStore, ingredients: IngredientStore): Promise<string> {
  return JSON.stringify({
    units: await units.getAll(),
    categories: await categories.getAll(),
    ingredients: await ingredients.getAll(),
  });
}

export async function importData(units: UnitStore, categories: CategoryStore, ingredients: IngredientStore, data: string): Promise<void> {
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
}