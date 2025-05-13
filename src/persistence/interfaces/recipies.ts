import { IngredientQuantity, Recipie } from "../../models/recipies";
import { MealType } from "../../models/meals";

export interface RecipieStore {
  get(id: number): Promise<Recipie>;
  getAll(): Promise<Recipie[]>;
  add(name: string, description: string, serves: number, time: number, ingredients: IngredientQuantity[], steps: string[], meal: MealType): Promise<number>;
  put(value: Recipie): Promise<void>;
  delete(id: number): Promise<void>;
  clear(): Promise<void>;
}