import { Meal, MealDay, MealType } from "../../models/meals";

export interface MealStore {
  get(id: number): Promise<Meal>;
  getAll(): Promise<Meal[]>;
  getByDay(day: MealDay): Promise<Meal[]>;
  add(recipieId: number, servings: number, meal: MealType, day: MealDay): Promise<number>;
  put(value: Meal): Promise<void>;
  delete(id: number): Promise<void>;
  clear(): Promise<void>;
}
