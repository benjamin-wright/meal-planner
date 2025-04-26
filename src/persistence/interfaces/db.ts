import { CategoryStore } from "./categories";
import { IngredientStore } from "./ingredients";
import { MealStore } from "./meals";
import { RecipieStore } from "./recipies";
import { UnitStore } from "./units";
import { ExtraStore } from "./extras";
import { SettingsStore } from "./settings";
import { ShoppingItemStore } from "./shopping-item";

export interface DB {
  units(): UnitStore;
  categories(): CategoryStore;
  ingredients(): IngredientStore;
  recipies(): RecipieStore;
  meals(): MealStore;
  extra(): ExtraStore;
  shopping(): ShoppingItemStore;
  settings(): SettingsStore;
}
