import { useContext, useEffect, useState } from "react";
import { UnitsEditView } from "./units-edit-view";
import { Unit, UnitType } from "../../../../models/units";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { DBContext } from "../../../providers/database";

export function UnitsEdit() {
  const navigate = useNavigate();
  const params = useParams();
  const [search] = useSearchParams();
  const unitId = params.id ? parseInt(params.id, 10) : null;
  const type = search.get("type") as UnitType | undefined;

  const { stores } = useContext(DBContext);
  const [unit, setUnit] = useState<Unit>({
    id: 0,
    name: "",
    base: 1,
    type: type || UnitType.Count,
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

  async function handleSubmit(unit: Unit) {
    if (!stores) {
      return;
    }

    if (unit.id) {
      await stores.unitStore.put(unit);
    } else {
      await stores.unitStore.add(unit.name, unit.type, unit.magnitudes);
    }

    navigate(-1);
  }

  return <UnitsEditView unit={unit} onChange={setUnit} onNav={() => navigate(-1)} onSubmit={handleSubmit} />;
}
