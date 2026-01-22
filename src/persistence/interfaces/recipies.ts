import { CourseType, DishType } from "../../models/meals";
import { IngredientQuantity, Recipe } from "../../models/recipies";

export interface RecipieStore {
  get(id: number): Promise<Recipe>;
  getAll(): Promise<Recipe[]>;
  add(name: string, description: string, serves: number, time: number, ingredients: IngredientQuantity[], steps: string[], course: CourseType, dish: DishType): Promise<number>;
  put(value: Recipe): Promise<void>;
  delete(id: number): Promise<void>;
  clear(): Promise<void>;
}
