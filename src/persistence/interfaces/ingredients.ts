import { Ingredient } from "../../models/ingredients";
import { UnitType } from "../../models/units";

export interface IngredientStore {
  get(id: number): Promise<Ingredient>;
  getByCategory(category: number): Promise<Ingredient[]>;
  getByUnit(unit: number): Promise<Ingredient[]>;
  getAll(): Promise<Ingredient[]>;
  add(name: string, category: number, unitType: UnitType, unit?: number): Promise<number>;
  put(value: Ingredient): Promise<void>;
  delete(id: number): Promise<void>;
  clear(): Promise<void>;
}
