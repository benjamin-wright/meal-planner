import { ShoppingItem } from "../../models/shopping-item";
import { UnitType } from "../../models/units";

export interface ShoppingItemStore {
  get(id: number): Promise<ShoppingItem>;
  getAll(): Promise<ShoppingItem[]>;
  add(name: string, category: number, unitType: UnitType, quantity: number, got: boolean): Promise<number>;
  put(value: ShoppingItem): Promise<void>;
  delete(id: number): Promise<void>;
  clear(): Promise<void>;
}
