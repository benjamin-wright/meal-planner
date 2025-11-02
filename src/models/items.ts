import { defaultNumber, defaultString, defaultType, isObject } from "../utils/typing";
import { CourseType, DishType } from "./meals";

export type ReadymealData = {
  servings: number;
  time: number;
  course: CourseType;
  dish: DishType;
}

export enum ItemKind {
  Ingredient = 1,
  Readymeal = 2,
  Misc = 3,
}

export type Item = {
  id: number;
  name: string;
  category: number;
  kind: ItemKind;
  readymeal?: ReadymealData;
};

export function sanitize(value: unknown): Item {
  if (!isObject(value)) {
    return { id: 0, name: "", category: 0, kind: ItemKind.Ingredient };
  }

  return {
    id: defaultNumber(value["id"], 0),
    name: defaultString(value["name"], ""),
    category: defaultNumber(value["category"], 0),
    kind: defaultType<ItemKind>(value["kind"], ItemKind.Ingredient),
    readymeal: ((data: unknown) => {
      if (!isObject(data)) {
        return undefined;
      }

      return {
        servings: defaultNumber(data["servings"], 1),
        time: defaultNumber(data["time"], 1),
        course: defaultType<CourseType>(data["course"], CourseType.Dinner),
        dish: defaultType<DishType>(data["dish"], DishType.Main),
      };
    })(value["readymeal"])
  };
}
