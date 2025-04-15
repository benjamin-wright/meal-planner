import { CategoryStore } from "./categories";
import { IngredientStore } from "./ingredients";
import { MealStore } from "./meals";
import { RecipieStore } from "./recipies";
import { UnitStore } from "./units";
import { MiscStore } from "./misc";

export interface DB {
  units(): UnitStore;
  categories(): CategoryStore;
  ingredients(): IngredientStore;
  recipies(): RecipieStore;
  meals(): MealStore;
  misc(): MiscStore;
  reset(): Promise<void>;
}
