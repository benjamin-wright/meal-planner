import { Inedible } from "../../models/inedible";

export interface InedibleStore {
  get(id: number): Promise<Inedible>;
  getAll(): Promise<Inedible[]>;
  add(name: string, ingredientId: number, quantity: number): Promise<number>;
  put(value: Inedible): Promise<void>;
  delete(id: number): Promise<void>;
  clear(): Promise<void>;
}
