import { defaultNumber, defaultType, isObject } from "../utils/typing";

export type RandomIngredient = {
  name: string;
  category: number;
}

export type Extra = {
  id: number;
  ingredient: number | RandomIngredient;
  unit: number;
  quantity: number;
}

export function sanitize(extra: unknown): Extra {
  if (!isObject(extra)) {
    return { id: 0, ingredient: 0, unit: 0, quantity: 0 };
  }

  return {
    id: defaultNumber(extra.id, 0),
    ingredient: ((ingredient: unknown) => {
      if (ingredient !== null && isObject(ingredient)) {
        return {
          name: defaultType(ingredient["name"], ""),
          category: defaultNumber(ingredient["category"], 0),
        };
      } else if (typeof ingredient === "number") {
        return ingredient;
      }
      
      return { name: "", category: 0 };
    })(extra.ingredient),
    unit: defaultNumber(extra.unit, 0),
    quantity: defaultNumber(extra.quantity, 0),
  };
}