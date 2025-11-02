import { Item } from "../../models/items";
import { ItemStore } from "../interfaces/item";
import { TypedDB } from "./typed-db";

const TABLE_NAME = "items";

export function itemsV1(db: IDBDatabase) {
  const store = db.createObjectStore(TABLE_NAME, { keyPath: "id", autoIncrement: true });
  store.createIndex("name", "name", { unique: true });
  store.createIndex("category", "category");
  store.createIndex("edible", "edible");
}

type IndexedItem = {
  id: number;
  name: string;
  category: number;
  edible: number;
}

function toItem(data: IndexedItem): Item {
  return {
    id: data.id,
    name: data.name,
    category: data.category,
    edible: data.edible === 1,
  };
}

export class Items implements ItemStore {
  private db: TypedDB;

  constructor(db: TypedDB) {
    this.db = db;
  }

  async get(id: number): Promise<Item> {
    const data = await this.db.get<IndexedItem>(TABLE_NAME, id);
    return toItem(data);
  }

  async getAll(): Promise<Item[]> {
    const data = await this.db.getAll<IndexedItem>(TABLE_NAME);
    return data.map(toItem);
  }

  async getEdible(): Promise<Item[]> {
    const data = await this.db.getByIndex<IndexedItem, "edible">(TABLE_NAME, "edible", 1);
    return data.map(toItem);
  }

  async getInedible(): Promise<Item[]> {
    const data = await this.db.getByIndex<IndexedItem, "edible">(TABLE_NAME, "edible", 0);
    return data.map(toItem);
  }

  async add(name: string, category: number, edible: boolean): Promise<number> {
    return this.db.add(TABLE_NAME, { name, category, edible: edible ? 1 : 0 });
  }
  
  async put(value: Item): Promise<void> {
    return this.db.put(TABLE_NAME, {
      id: value.id,
      name: value.name,
      category: value.category,
      edible: value.edible ? 1 : 0,
    });
  }

  async delete(id: number): Promise<void> {
    return this.db.delete(TABLE_NAME, id);
  }

  async clear(): Promise<void> {
    return this.db.clear(TABLE_NAME);
  }
}
