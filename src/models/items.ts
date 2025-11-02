import { defaultBoolean, defaultNumber, defaultString, defaultType, isObject } from "../utils/typing";
import { CourseType, DishType } from "./meals";

export type ReadymealData = {
  course: CourseType;
  dish: DishType;
  serves: number;
  time: number;
}

export type Item = {
  id: number;
  kind: "item";
  name: string;
  category: number;
  edible: boolean;
  readymeal?: ReadymealData;
};

export function sanitize(value: unknown): Item {
  if (!isObject(value)) {
    return { id: 0, kind: "item", name: "", category: 0, edible: true };
  }

  return {
    id: defaultNumber(value["id"], 0),
    kind: "item",
    name: defaultString(value["name"], ""),
    category: defaultNumber(value["category"], 0),
    edible: defaultBoolean(value["edible"], true),
    readymeal: isObject(value["readymeal"]) ? {
      course: defaultType<CourseType>(value["readymeal"]["course"], CourseType.Dinner),
      dish: defaultType<DishType>(value["readymeal"]["dish"], DishType.Main),
      serves: defaultNumber(value["readymeal"]["serves"], 0),
      time: defaultNumber(value["readymeal"]["time"], 0),
    } : undefined,
  };
}
