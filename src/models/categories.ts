import { defaultNumber, defaultString, isObject } from "../utils/typing";

export interface CategoryProps {
  id: number;
  name: string;
  order: number;
}

export type Category = {
  id: number;
  name: string;
  order: number;
}

export function sanitize(value: unknown): Category {
  if (!isObject(value)) {
    return {id: 0, name: "", order: 0};
  }

  return {
    id: defaultNumber(value.id, 0),
    name: defaultString(value.name, ""),
    order: defaultNumber(value.order, 0),
  };
}