import { defaultArray, defaultNumber, defaultString, defaultType, isObject } from "../utils/typing";
import { CourseType, DishType } from "./meals";

export type IngredientQuantity = {
  id: number;
  unit: number;
  quantity: number;
}

export type Recipe = {
  id: number;
  name: string;
  description: string;
  serves: number;
  time: number;
  ingredients: IngredientQuantity[];
  steps: string[];
  course: CourseType;
  dish: DishType;
}

export function sanitize(value: unknown): Recipe {
  if (!isObject(value)) {
    return { id: 0, name: "", description: "", serves: 0, time: 0, ingredients: [], steps: [], course: CourseType.Dinner, dish: DishType.Main };
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
    course: defaultType<CourseType>(value["course"], CourseType.Dinner),
    dish: defaultType<DishType>(value["dish"], DishType.Main),
  };
}
