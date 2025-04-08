import { CategoryStore } from "./categories";
import { InedibleStore } from "./inedibles";
import { IngredientStore } from "./ingredients";
import { MealStore } from "./meals";
import { RecipieStore } from "./recipies";
import { ShoppingStore } from "./shopping";
import { UnitStore } from "./units";

export interface DB {
  units(): UnitStore;
  categories(): CategoryStore;
  ingredients(): IngredientStore;
  recipies(): RecipieStore;
  meals(): MealStore;
  inedibles(): InedibleStore;
  shopping(): ShoppingStore;
  clear(): Promise<void>;
}
