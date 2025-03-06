import { Inedible } from "../../models/inedible";
import { InedibleStore } from "../interfaces/inedibles";
import { DB } from "./db";

export function inediblesV1(db: IDBDatabase) {
  db.createObjectStore("inedibles", { keyPath: "id", autoIncrement: true });
}

export class Inedibles implements InedibleStore {
  private db: DB;

  constructor(db: DB) {
    this.db = db;
  }

  async get(id: number): Promise<Inedible> {
    return this.db.get<Inedible>("inedibles", id);
  }

  async getAll(): Promise<Inedible[]> {
    return this.db.getAll<Inedible>("inedibles");
  }

  async add(name: string, ingredientId: number, quantity: number): Promise<number> {
    return this.db.add("inedibles", { name, ingredientId, quantity });
  }

  async put(value: Inedible): Promise<void> {
    return this.db.put("inedibles", value);
  }

  async delete(id: number): Promise<void> {
    return this.db.delete("inedibles", id);
  }

  async clear(): Promise<void> {
    return this.db.clear("inedibles");
  }
}
