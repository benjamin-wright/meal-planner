import { Ingredient } from "../../models/ingredients";

export interface IngredientStore {
  get(id: number): Promise<Ingredient>;
  getEdible(): Promise<Ingredient[]>;
  getInedible(): Promise<Ingredient[]>;
  getAll(): Promise<Ingredient[]>;
  add(name: string, category: number, edible: boolean): Promise<number>;
  put(value: Ingredient): Promise<void>;
  delete(id: number): Promise<void>;
  clear(): Promise<void>;
}
