import { UnitsEditView } from "./units-edit-view";
import { UnitType } from "../../../../models/units";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useUnit } from "../../../hooks/useUnit";

export function UnitsEdit() {
  const navigate = useNavigate();
  const params = useParams();
  const [search] = useSearchParams();
  const unitId = params.id ? parseInt(params.id, 10) : null;
  const type = search.get("type") as UnitType | undefined;

  const [unit, setUnit, saveUnit] = useUnit(unitId, type);

  async function handleSubmit() {
    await saveUnit();
    navigate(-1);
  }

  return <UnitsEditView unit={unit} onChange={setUnit} onSubmit={handleSubmit} />;
}
