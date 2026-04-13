import { Item, ItemKind, ReadymealData } from "../../models/items";

export interface ItemStore {
  get(id: number): Promise<Item>;
  getAll(): Promise<Item[]>;
  getByKind(kind: ItemKind): Promise<Item[]>;
  add(name: string, category: number, kind: ItemKind, readymeal?: ReadymealData): Promise<number>;
  put(value: Item): Promise<void>;
  delete(id: number): Promise<void>;
  clear(): Promise<void>;
}
