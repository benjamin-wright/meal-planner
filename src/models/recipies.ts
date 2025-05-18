import { defaultArray, defaultNumber, defaultString, isObject } from "../utils/typing";
import { MealType } from "./meals";

export type IngredientQuantity = {
  id: number;
  unit: number;
  quantity: number;
}

export type Recipie = {
  id: number;
  name: string;
  description: string;
  serves: number;
  time: number;
  ingredients: IngredientQuantity[];
  steps: string[];
  meal: MealType; // breakfast, lunch, or dinner
}

export function sanitize(value: unknown): Recipie {
  if (!isObject(value)) {
    return { id: 0, name: "", description: "", serves: 0, time: 0, ingredients: [], steps: [], meal: MealType.Dinner };
  }

  return {
    id: defaultNumber(value["id"], 0),
    name: defaultString(value["name"], ""),
    description: defaultString(value["description"], ""),
    serves: defaultNumber(value["serves"], 0),
    time: defaultNumber(value["time"], 0),
    ingredients: defaultArray<IngredientQuantity>(value["ingredients"], (item) => {
      if (!isObject(item)) {
        return { id: 0, unit: 0, quantity: 0 };
      }

      return {
        id: defaultNumber(item["id"], 0),
        unit: defaultNumber(item["unit"], 0),
        quantity: defaultNumber(item["quantity"], 0),
      };
    }),
    steps: defaultArray<string>(value["steps"], (item) => defaultString(item, "")),
    meal: defaultString(value["meal"], "dinner") as MealType,
  };
}