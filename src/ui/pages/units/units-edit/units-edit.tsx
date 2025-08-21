import { useEffect, useState } from "react";
import { useController } from "../hooks/use-controller";
import { UnitsEditView } from "./units-edit-view";
import { Unit, UnitType } from "../../../../models/units";
import { useNavigate, useParams } from "react-router-dom";

export function UnitsEdit() {
  const navigate = useNavigate();
  const params = useParams();
  const unitId = params.id ? parseInt(params.id, 10) : null;

  const { controller } = useController();
  const [unit, setUnit] = useState<Unit>({
    id: 0,
    name: "",
    type: UnitType.Weight,
    magnitudes: [],
    collectives: []
  });

  useEffect(() => {
    if (!controller || !unitId) {
      return;
    }

    const fetchUnit = async () => {
      const fetchedUnit = await controller.getUnit(unitId);
      if (fetchedUnit) {
        setUnit(fetchedUnit);
      }
    };

    fetchUnit();
  }, [unitId, controller]);

  return <UnitsEditView unit={unit} onChange={setUnit} onNav={() => navigate(-1)} onSubmit={(unit) => console.info(JSON.stringify(unit))} />;
}
