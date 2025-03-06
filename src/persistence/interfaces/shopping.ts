import { Shopping } from "../../models/shopping";

export interface ShoppingStore {
  get(id: number): Promise<Shopping>;
  getAll(): Promise<Shopping[]>;
  add(name: string, category: number, unit: number | undefined, quantity: number | undefined, got: boolean): Promise<number>;
  put(value: Shopping): Promise<void>;
  delete(id: number): Promise<void>;
  clear(): Promise<void>;
}
