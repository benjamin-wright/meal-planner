import { useContext, useEffect, useState } from "react";
import { DBContext } from "../providers/database/db-context";
import { ActionQueue } from "../../utils/action-queue";
import { Unit, UnitType } from "../../models/units";

const queue = new ActionQueue();

export function useUnits(unitType: UnitType): [Unit[], (unit: Unit) => void] {
  const { stores } = useContext(DBContext);
  const [units, setUnits] = useState<Unit[]>([]);

  useEffect(() => {
    if (!stores) return;

    (async () => {
      const units = await stores.unitStore.getAllByType(unitType);
      setUnits(units);
    })();
  }, [stores, unitType]);

  function deleteUnit(unit: Unit) {
    if (!stores) return;

    queue.enqueue(async () => {
      await stores.unitStore.delete(unit.id);
    });
    setUnits(units.filter(u => u.id !== unit.id));
  }

  return [units, deleteUnit];
}
