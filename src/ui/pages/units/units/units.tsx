import { useNavigate, useSearchParams } from "react-router-dom";
import { UnitsView } from "./units-view";
import { useContext, useEffect, useState } from "react";
import { Unit, UnitType } from "../../../../models/units";
import { DBContext } from "../../../providers/database";

export function Units() {
  const navigate = useNavigate();

  const { stores } = useContext(DBContext);
  const [search] = useSearchParams();

  const type = search.get("type") as UnitType | undefined;
  const [units, setUnits] = useState<Unit[]>([]);
  const [unitType, setUnitType] = useState<UnitType>(type || UnitType.Weight);

  useEffect(() => {
    if (type !== unitType) {
      navigate(`/units?type=${unitType}`, { replace: true });
    }
  }, [type, unitType]);

  useEffect(() => {
    if (!stores) return;

    (async () => {
      const units = await stores.unitStore.getAllByType(unitType);
      setUnits(units);
    })();
  }, [stores, unitType]);


  if (!stores || !units) {
    return <div>Loading...</div>; // Handle loading state
  }

  async function handleDelete(unit: Unit) {
    if (!stores) return;

    try {
      await stores.unitStore.delete(unit.id);
      setUnits(prev => prev.filter(u => u.id !== unit.id));
    } catch (error) {
      console.error("Failed to delete unit:", error);
    }
  }

  return <UnitsView
    units={units}
    unitType={unitType}
    onTypeChanged={(type: UnitType) => setUnitType(type)}
    onBack={() => navigate("/data")}
    onEdit={(unit) => navigate(`/units/${unit.id}`)}
    onDelete={handleDelete}
    onNew={(type: UnitType) => navigate(`/units/new?type=${type}`)}
  />;
}
