import { useNavigate, useSearchParams } from "react-router-dom";
import { UnitsView } from "./units-view";
import { useContext, useEffect, useState } from "react";
import { UnitType } from "../../../../models/units";
import { DBContext } from "../../../providers/database/db-context";
import { useUnits } from "../../../hooks/useUnits";

export function Units() {
  const navigate = useNavigate();

  const { stores } = useContext(DBContext);
  const [search] = useSearchParams();

  const type = search.get("type") as UnitType | undefined;
  const [unitType, setUnitType] = useState<UnitType>(type || UnitType.Weight);
  const [units, deleteUnit] = useUnits(unitType);

  useEffect(() => {
    if (type !== unitType) {
      navigate(`/units?type=${unitType}`, { replace: true });
    }
  }, [type, unitType, navigate]);


  if (!stores || !units) {
    return <div>Loading...</div>; // Handle loading state
  }

  return <UnitsView
    units={units}
    unitType={unitType}
    onTypeChanged={(type: UnitType) => setUnitType(type)}
    onEdit={(unit) => navigate(`/units/${unit.id}`)}
    onDelete={deleteUnit}
    onNew={(type: UnitType) => navigate(`/units/new?type=${type}`)}
  />;
}
