import { Unit, UnitType } from "../models/units";
import { UnitStore } from "../persistence/interfaces/units";

export class UnitsController {
  private units: UnitStore;

  constructor(units: UnitStore) {
    this.units = units;
  }

  async getUnits(type: UnitType): Promise<Unit[]> {
    return this.units.getAllByType(type);
  }

  async getUnit(id: number): Promise<Unit | null> {
    return this.units.get(id);
  }

  async deleteUnit(id: number): Promise<void> {
    await this.units.delete(id);
  }

  async saveUnit(unit: Unit): Promise<void> {
    if (unit.id && unit.id > 0) {
      await this.units.put(unit);
    } else {
      await this.units.add(unit.name, unit.type, unit.magnitudes, unit.collectives);
    }
  }
}
