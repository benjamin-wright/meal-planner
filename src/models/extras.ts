import { defaultNumber, isObject } from "../utils/typing";

export type Extra = {
  id: number;
  ingredient: number;
  unit: number;
  quantity: number;
}

export namespace Extra {
  export function sanitize(extra: unknown): Extra {
    if (!isObject(extra)) {
      return { id: 0, ingredient: 0, unit: 0, quantity: 0 };
    }

    return {
      id: defaultNumber(extra.id, 0),
      ingredient: defaultNumber(extra.ingredient, 0),
      unit: defaultNumber(extra.unit, 0),
      quantity: defaultNumber(extra.quantity, 0),
    };
  }
}