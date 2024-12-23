import { Ingredient } from "../../models/ingredients";

export interface IngredientStore {
  get(id: number): Promise<Ingredient>;
  getByCategory(category: number): Promise<Ingredient[]>;
  getByUnit(unit: number): Promise<Ingredient[]>;
  getAll(): Promise<Ingredient[]>;
  add(name: string, category: number, unit: number): Promise<number>;
  put(value: Ingredient): Promise<void>;
  delete(id: number): Promise<void>;
}