import { settings } from "../models/settings";
import { UnitType } from "../models/units";
import { DBFlags } from "../persistence/db-flags";
import { exportData, importData } from "../persistence/exporter";
import { DB } from "../persistence/interfaces/db";
import { SettingsStore } from "../persistence/interfaces/settings";
import { UnitStore } from "../persistence/interfaces/units";

export class SettingsController {
  private db: DB;
  private dbName: string;
  private settings: SettingsStore;
  private units: UnitStore;

  constructor(db: DB, dbName: string, settings: SettingsStore, units: UnitStore) {
    this.db = db;
    this.dbName = dbName;
    this.settings = settings;
    this.units = units;
  }

  async getSettings() {
    return this.settings.get();
  }

  async updateSettings(value: settings) {
    await this.settings.put(value);
  }

  async getVolumeUnits() {
    const units = await this.units.getAll();
    return units.filter(unit => unit.type === UnitType.Volume);
  }

  async getWeightUnits() {
    const units = await this.units.getAll();
    return units.filter(unit => unit.type === UnitType.Weight);
  }

  async backup() {
    return await exportData(this.db);
  }

  async restore(data: string) {
    await importData(this.db, data);
  }

  reset() {
    DBFlags.setReset(this.dbName);
  }
}