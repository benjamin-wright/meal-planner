import { PlanItem } from "../../models/plan-item";
import { PlanItemStore } from "../interfaces/plan-items";
import { DB } from "./db";

export function planItemsV1(db: IDBDatabase) {
  db.createObjectStore("plan-items", { keyPath: "id", autoIncrement: true });
}

export class PlanItems implements PlanItemStore {
  private db: DB;

  constructor(db: DB) {
    this.db = db;
  }

  async get(id: number): Promise<PlanItem> {
    return this.db.get<PlanItem>("plan-items", id);
  }

  async getAll(): Promise<PlanItem[]> {
    return this.db.getAll<PlanItem>("plan-items");
  }

  async add(name: string, order: number): Promise<number> {
    return this.db.add("plan-items", { name, order });
  }

  async put(value: PlanItem): Promise<void> {
    return this.db.put("plan-items", value);
  }

  async delete(id: number): Promise<void> {
    return this.db.delete("plan-items", id);
  }

  async clear(): Promise<void> {
    return this.db.clear("plan-items");
  }
}
