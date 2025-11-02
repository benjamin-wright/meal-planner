import { defaultNumber, defaultType, isObject } from "../utils/typing";
import { CourseType, DishType } from "./meals";

export type Recipie = {
  id: number;
  kind: "readymeal";
  item: number;
  serves: number;
  time: number;
  course: CourseType;
  dish: DishType;
}

export function sanitize(value: unknown): Recipie {
  if (!isObject(value)) {
    return { id: 0, kind: "readymeal", item: 0, serves: 0, time: 0, course: CourseType.Dinner, dish: DishType.Main };
  }

  return {
    id: defaultNumber(value["id"], 0),
    kind: "readymeal",
    item: defaultNumber(value["item"], 0),
    serves: defaultNumber(value["serves"], 0),
    time: defaultNumber(value["time"], 0),
    course: defaultType<CourseType>(value["course"], CourseType.Dinner),
    dish: defaultType<DishType>(value["dish"], DishType.Main),
  };
}