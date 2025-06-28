import { defaultNumber, defaultString, isObject } from "../utils/typing";
import { MealType } from "./meals";

export type ReadyMeal = {
  id: number;
  name: string;
  serves: number;
  time: number;
  meal: MealType; // breakfast, lunch, or dinner
  category: number; // optional category for the meal
}

export function sanitize(value: unknown): ReadyMeal {
  if (!isObject(value)) {
    return { id: 0, name: "", serves: 0, time: 0, meal: MealType.Dinner, category: 0 };
  }

  return {
    id: defaultNumber(value["id"], 0),
    name: defaultString(value["name"], ""),
    serves: defaultNumber(value["serves"], 0),
    time: defaultNumber(value["time"], 0),
    meal: defaultString(value["meal"], "dinner") as MealType,
    category: defaultNumber(value["category"], 0)
  };
}