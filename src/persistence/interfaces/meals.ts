import { Meal, MealDay, MealProps, MealRecipieType, MealType } from "../../models/meals";

export interface MealStore {
  get(id: number): Promise<Meal>;
  getAll(): Promise<Meal[]>;
  add(recipieId: number, recipieType: MealRecipieType, servings: number, meal: MealType, days: MealDay[]): Promise<number>;
  put(value: MealProps): Promise<void>;
  delete(id: number): Promise<void>;
  clear(): Promise<void>;
}
