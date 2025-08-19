import { useNavigate } from "react-router-dom";
import { UnitsView } from "./units-view";
import { useContext, useEffect, useState } from "react";
import { DBContext } from "../../providers/database";
import { UnitsController } from "../../../controllers/units";
import { Unit } from "../../../models/units";

function useDatabase() {
  const { stores } = useContext(DBContext);

  const [controller, setController] = useState<UnitsController | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);

  useEffect(() => {
    if (!stores) return;

    const controller = new UnitsController(stores.unitStore);
    setController(controller);
  }, [stores]);

  useEffect(() => {
    if (!controller) return;

    const loadUnits = async () => {
      const units = await controller.getUnits();
      setUnits(units);
    };

    loadUnits();
  }, [controller]);

  return { controller, units, setUnits };
}

export function Units() {
  const { controller, units, setUnits } = useDatabase();
  const navigate = useNavigate();

  if (!controller || !units) {
    return <div>Loading...</div>; // Handle loading state
  }

  async function handleDelete(unit: Unit) {
    try {
      await controller?.deleteUnit(unit.id);
      setUnits(prev => prev.filter(u => u.id !== unit.id));
    } catch (error) {
      console.error("Failed to delete unit:", error);
    }
  }

  return <UnitsView
    units={units}
    onBack={() => navigate("/data")}
    onEdit={(unit) => navigate(`/units/${unit.id}`)}
    onDelete={handleDelete}
    onNew={() => navigate("/units/new")}
  />;
}
