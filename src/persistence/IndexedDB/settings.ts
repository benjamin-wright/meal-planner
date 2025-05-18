import { settings } from "../../models/settings";
import { SettingsStore } from "../interfaces/settings";
import { TypedDB } from "./typed-db";

const TABLE_NAME = "settings";

export function settingsV1(db: IDBDatabase) {
  db.createObjectStore(TABLE_NAME, { keyPath: "id" });
}

type storedSettings = settings &{
  id: number;
}

export class Settings implements SettingsStore {
  private db: TypedDB;

  constructor(db: TypedDB) {
    this.db = db;
  }

  async get(): Promise<settings> {
    const stored = await this.db.get<storedSettings>(TABLE_NAME, 1);
    return {
      preferredWeightUnit: stored.preferredWeightUnit,
      preferredVolumeUnit: stored.preferredVolumeUnit,
    }
  }

  async put(value: settings): Promise<void> {
    return this.db.put(TABLE_NAME, {id: 1, ...value});
  }

  async clear(): Promise<void> {
    return this.db.clear(TABLE_NAME);
  }
}
