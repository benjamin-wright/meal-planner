import { Shopping as ShoppingObj } from "../../models/shopping";
import { ShoppingStore } from "../interfaces/shopping";
import { DB } from "./db";

export function shoppingV1(db: IDBDatabase) {
  const store = db.createObjectStore("shopping", { keyPath: "id", autoIncrement: true });
  store.createIndex("name", "name", { unique: true });
}

export class Shopping implements ShoppingStore {
  private db: DB;

  constructor(db: DB) {
    this.db = db;
  }

  async get(id: number): Promise<ShoppingObj> {
    return this.db.get<ShoppingObj>("shopping", id);
  }

  async getAll(): Promise<ShoppingObj[]> {
    return this.db.getAll<ShoppingObj>("shopping");
  }

  async add(name: string, category: number, unit: number | undefined, quantity: number | undefined, got: boolean): Promise<number> {
    return this.db.add("shopping", { name, category, unit, quantity, got });
  }

  async put(value: ShoppingObj): Promise<void> {
    return this.db.put("shopping", value);
  }

  async delete(id: number): Promise<void> {
    return this.db.delete("shopping", id);
  }

  async clear(): Promise<void> {
    return this.db.clear("shopping");
  }
}
