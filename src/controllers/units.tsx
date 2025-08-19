import { Unit, UnitType } from "../models/units";
import { UnitStore } from "../persistence/interfaces/units";

export class UnitsController {
  private units: UnitStore;

  constructor(units: UnitStore) {
    this.units = units;
  }

  async getUnits(): Promise<Unit[]> {
    return this.units.getAll();
  }

  async getUnit(id: number): Promise<Unit | null> {
    return this.units.get(id);
  }

  async deleteUnit(id: number): Promise<void> {
    await this.units.delete(id);
  }
}
