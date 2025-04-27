import { ShoppingItem } from "../../models/shopping-item";
import { UnitType } from "../../models/units";
import { ShoppingItemStore } from "../interfaces/shopping-item";
import { TypedDB } from "./typed-db";

const TABLE_NAME = "shopping-items";

export function shoppingItemsV1(db: IDBDatabase) {
  db.createObjectStore(TABLE_NAME, { keyPath: "id", autoIncrement: true });
}

export class ShoppingItems implements ShoppingItemStore {
  private db: TypedDB;

  constructor(db: TypedDB) {
    this.db = db;
  }

  async get(id: number): Promise<ShoppingItem> {
    return this.db.get<ShoppingItem>(TABLE_NAME, id);
  }

  async getAll(): Promise<ShoppingItem[]> {
    return this.db.getAll<ShoppingItem>(TABLE_NAME);
  }

  async add(name: string, category: number, unitType: UnitType, unit: number | undefined, quantity: number, got: boolean): Promise<number> {
    return this.db.add(TABLE_NAME, { name, category, unitType, unit, quantity, got });
  }

  async put(value: ShoppingItem): Promise<void> {
    return this.db.put(TABLE_NAME, value);
  }

  async check(id: number, got: boolean): Promise<void> {
    const item = await this.get(id);
    if (!item) {
      throw new Error(`Failed to update item ${id}: not found`);
    }

    item.got = got;
    return this.put(item);
  }

  async delete(id: number): Promise<void> {
    return this.db.delete(TABLE_NAME, id);
  }

  async clear(): Promise<void> {
    return this.db.clear(TABLE_NAME);
  }
}
