import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { parseType, Unit, UnitType } from "../../../../models/units";
import { DBContext } from "../../../providers/database/db-context";
import { useUnits } from "../../../hooks/useUnits";
import { Accordion } from "../../../components/containers/accordion/accordion";
import { TabHeader } from "../../../components/inputs/tab-header/tab-header";
import { Page } from "../../../components/layout/page/page";
import { UnitListItem } from "./components/unit-list-item/unit-list-item";
import { AddButton } from "../../../components/inputs/add-button/add-button";
import { Dialog } from "../../../components/containers/dialog/dialog";

import './units.css';

export function Units() {
  const navigate = useNavigate();

  const { stores } = useContext(DBContext);
  const [search] = useSearchParams();

  const type = search.get("type") as UnitType | undefined;
  const [unitType, setUnitType] = useState<UnitType>(type || UnitType.Weight);
  const [units, deleteUnit] = useUnits(unitType);
  const [toDelete, setToDelete] = useState<Unit | undefined>(undefined);

  useEffect(() => {
    if (type !== unitType) {
      navigate(`/units?type=${unitType}`, { replace: true });
    }
  }, [type, unitType, navigate]);


  if (!stores || !units) {
    return <div>Loading...</div>;
  }

  function handleTabChange(tab: string) {
    const parsed = parseType(tab);
    if (parsed) {
      setUnitType(parsed);
    }
  }

  function handleDelete(ok: boolean) {
    if (ok && toDelete) {
      deleteUnit(toDelete);
      setToDelete(undefined);
    }
  }

  return (
    <Page title="Units">
      <TabHeader id="units-tabs" tabs={[UnitType.Weight, UnitType.Volume, UnitType.Count]} selected={unitType} onTabChange={handleTabChange} />
      <br />
      <Accordion>
        {units.map(unit => (
          <UnitListItem
            key={unit.id}
            unit={unit}
            onEdit={() => navigate(`/units/${unit.id}`)}
            onDelete={() => setToDelete(unit)}
          />
        ))}
        <AddButton
          id="add-unit-button"
          onClick={() => navigate(`/units/new?type=${unitType}`)}
        />
      </Accordion>
      <Dialog
        isOpen={!!toDelete}
        prompt="Are you sure you want to delete this unit?"
        warning="This action cannot be undone."
        onClose={handleDelete}
      />
    </Page>
  );
}
