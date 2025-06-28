import { ReadyMeal } from "../../models/readymeals";
import { MealType } from "../../models/meals";

export interface ReadyMealStore {
  get(id: number): Promise<ReadyMeal>;
  getAll(): Promise<ReadyMeal[]>;
  add(name: string, serves: number, time: number, meal: MealType, category: number): Promise<number>;
  put(value: ReadyMeal): Promise<void>;
  delete(id: number): Promise<void>;
  clear(): Promise<void>;
}