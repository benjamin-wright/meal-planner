import { useContext, useEffect, useState } from "react";
import { UnitsController } from "../../../../controllers/units";
import { DBContext } from "../../../providers/database";

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
