import { useContext, useEffect, useState } from "react";
import { DBContext } from "../providers/database/db-context";
import { Unit, UnitType } from "../../models/units";

export function useUnit(unitId: number | null, defaultType?: UnitType): [Unit, (unit: Unit) => void, () => Promise<void>] {
  const { stores } = useContext(DBContext);
  const [unit, setUnit] = useState<Unit>({
    id: 0,
    name: "",
    base: 1,
    type: defaultType || UnitType.Count,
    magnitudes: []
  });

  useEffect(() => {
    if (!stores || !unitId) {
      return;
    }

    const fetchUnit = async () => {
      const fetchedUnit = await stores.unitStore.get(unitId);
      if (fetchedUnit) {
        setUnit(fetchedUnit);
      }
    };

    fetchUnit();
  }, [unitId, stores]);

  async function save() {
    if (!stores) {
      return;
    }

    if (unit.id) {
      await stores.unitStore.put(unit);
    } else {
      await stores.unitStore.add(unit.name, unit.type, unit.magnitudes);
    }
  }

  return [unit, setUnit, save];
}
