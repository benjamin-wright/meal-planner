export type IngredientQuantity = {
  id: number;
  quantity: number;
}

export class Recipie {
  id: number;
  name: string;
  description: string;
  serves: number;
  time: number;
  ingredients: IngredientQuantity[];
  steps: string[];

  constructor(id: number, name: string, description: string, serves: number, time: number, ingredients: IngredientQuantity[], steps: string[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.serves = serves;
    this.time = time;
    this.ingredients = ingredients;
    this.steps = steps;
  }
}
