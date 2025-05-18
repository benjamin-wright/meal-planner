import { defaultBoolean, defaultNumber, defaultString, isObject } from "../utils/typing";

export type Ingredient = {
  id: number;
  name: string;
  category: number;
  edible: boolean;
};

export namespace Ingredient {
  export function sanitize(value: unknown): Ingredient {
    if (!isObject(value)) {
      return { id: 0, name: "", category: 0, edible: true };
    }

    return {
      id: defaultNumber(value["id"], 0),
      name: defaultString(value["name"], ""),
      category: defaultNumber(value["category"], 0),
      edible: defaultBoolean(value["edible"], true),
    };
  }
}
