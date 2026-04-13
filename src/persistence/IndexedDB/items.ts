import { Item, ItemKind, ReadymealData } from "../../models/items";
import { ItemStore } from "../interfaces/item";
import { TypedDB } from "./typed-db";

const TABLE_NAME = "items";

export function itemsV1(db: IDBDatabase) {
  const store = db.createObjectStore(TABLE_NAME, { keyPath: "id", autoIncrement: true });
  store.createIndex("kind", "kind");
}

export class Items implements ItemStore {
  private db: TypedDB;

  constructor(db: TypedDB) {
    this.db = db;
  }

  async get(id: number): Promise<Item> {
    return await this.db.get<Item>(TABLE_NAME, id);
  }

  async getAll(): Promise<Item[]> {
    return await this.db.getAll<Item>(TABLE_NAME);
  }

  async getByKind(kind: ItemKind): Promise<Item[]> {
    return await this.db.getByIndex<Item, "kind">(TABLE_NAME, "kind", kind);
  }

  async add(name: string, category: number, kind: ItemKind, readymeal?: ReadymealData): Promise<number> {
    return this.db.add(TABLE_NAME, { name, category, kind, readymeal });
  }
  
  async put(value: Item): Promise<void> {
    return this.db.put(TABLE_NAME, {
      id: value.id,
      name: value.name,
      category: value.category,
      kind: value.kind,
      readymeal: value.readymeal
    });
  }

  async delete(id: number): Promise<void> {
    return this.db.delete(TABLE_NAME, id);
  }

  async clear(): Promise<void> {
    return this.db.clear(TABLE_NAME);
  }
}
