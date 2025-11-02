import { Item } from "../../models/items";

export interface ItemStore {
  get(id: number): Promise<Item>;
  getEdible(): Promise<Item[]>;
  getInedible(): Promise<Item[]>;
  getAll(): Promise<Item[]>;
  add(name: string, category: number, edible: boolean): Promise<number>;
  put(value: Item): Promise<void>;
  delete(id: number): Promise<void>;
  clear(): Promise<void>;
}
