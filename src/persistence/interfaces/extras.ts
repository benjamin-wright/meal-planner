import { Extra } from "../../models/extras";

export interface ExtraStore {
  get(id: number): Promise<Extra>;
  getAll(): Promise<Extra[]>;
  add(ingredient: number, unit: number, quantity: number): Promise<number>;
  put(value: Extra): Promise<void>;
  delete(id: number): Promise<void>;
  clear(): Promise<void>;
}