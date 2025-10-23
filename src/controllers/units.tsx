import { useContext, useEffect, useState } from "react";
import { Unit, UnitType } from "../models/units";
import { UnitStore } from "../persistence/interfaces/units";
import { DBContext } from "../ui/providers/database";

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

export function useController() {
  const { stores } = useContext(DBContext);

  const [controller, setController] = useState<UnitsController | null>(null);

  useEffect(() => {
    if (!stores) return;

    const controller = new UnitsController(stores.unitStore);
    setController(controller);
  }, [stores]);

  return { controller };
}
