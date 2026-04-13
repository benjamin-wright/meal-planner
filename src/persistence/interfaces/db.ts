import { UnitStore } from "./units";
import { CategoryStore } from "./categories";
import { ItemStore } from "./item";
import { MealStore } from "./meals";
import { RecipieStore } from "./recipies";
import { ExtraStore } from "./extras";
import { ShoppingItemStore } from "./shopping-item";

export interface DB {
  units(): UnitStore;
  categories(): CategoryStore;
  items(): ItemStore;
  recipies(): RecipieStore;
  meals(): MealStore;
  extra(): ExtraStore;
  shopping(): ShoppingItemStore;
}
