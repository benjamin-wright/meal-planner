export type IngredientQuantity = {
  id: number;
  quantity: number;
}

export class Recipie {
  id: number;
  name: string;
  serves: number;
  ingredients: IngredientQuantity[];
  steps: string[];

  constructor(id: number, name: string, serves: number, ingredients: IngredientQuantity[], steps: string[]) {
    this.id = id;
    this.name = name;
    this.serves = serves;
    this.ingredients = ingredients;
    this.steps = steps;
  }
}
