import { MealType } from "./meals";

export type IngredientQuantity = {
  id: number;
  unit: number;
  quantity: number;
}

export type Recipie = {
  id: number;
  name: string;
  description: string;
  serves: number;
  time: number;
  ingredients: IngredientQuantity[];
  steps: string[];
  meal: MealType; // breakfast, lunch, or dinner
}
