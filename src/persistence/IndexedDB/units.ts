import { Magnitude, Unit, UnitType } from "../../models/units";
import { UnitStore } from "../interfaces/units";
import { DB } from "./db";

export function unitsV1(db: IDBDatabase) {
  const store = db.createObjectStore("units", { keyPath: "id", autoIncrement: true });
  store.createIndex("name", "name", { unique: true });
}

export class Units implements UnitStore {
  private db: DB;

  constructor(db: DB) {
    this.db = db;
  }

  async get(id: number): Promise<Unit> {
    return this.db.get<Unit>("units", id);
  }

  async getAll(): Promise<Unit[]> {
    return this.db.getAll<Unit>("units");
  }

  async add(name: string, type: UnitType, magnitudes?: Magnitude[], singular?: string, plural?: string): Promise<number> {
    if (magnitudes) {
      magnitudes.sort((a, b) => a.multiplier - b.multiplier);
    }
    return this.db.add("units", { name, type, magnitudes, singular, plural });
  }

  async put(value: Unit): Promise<void> {
    if (value.magnitudes) {
      value.magnitudes.sort((a, b) => a.multiplier - b.multiplier);
    }
    return this.db.put("units", value);
  }

  async delete(id: number): Promise<void> {
    return this.db.delete("units", id);
  }

  async clear(): Promise<void> {
    return this.db.clear("units");
  }
}
