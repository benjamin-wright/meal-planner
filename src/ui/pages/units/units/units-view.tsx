import { parseType, Unit, UnitType } from "../../../../models/units";
import { Accordion } from "../../../components/containers/accordion/accordion";
import { TabHeader } from "../../../components/inputs/tab-header/tab-header";
import { Page } from "../../../components/layout/page/page";
import { UnitListItem } from "./components/unit-list-item/unit-list-item";
import { AddButton } from "../../../components/inputs/add-button/add-button";
import { Dialog } from "../../../components/containers/dialog/dialog";
import { useState } from "react";

type Props = {
  units: Unit[];
  unitType: UnitType;
  onTypeChanged: (type: UnitType) => void;
  onBack: () => void;
  onEdit: (unit: Unit) => void;
  onDelete: (unit: Unit) => void;
  onNew: (type: UnitType) => void;
}

export function UnitsView({ units, unitType, onTypeChanged, onBack, onEdit, onDelete, onNew }: Props) {
  function handleTabChange(tab: string) {
    const type = parseType(tab);
    if (type) {
      onTypeChanged(type);
    }
  }

  const [toDelete, setToDelete] = useState<Unit | undefined>(undefined);
  function handleDelete() {
    if (toDelete) {
      onDelete(toDelete);
      setToDelete(undefined);
    }
  }

  return (
    <Page title="Units" onNav={onBack}>
      <TabHeader id="units-tabs" tabs={[UnitType.Weight, UnitType.Volume, UnitType.Count]} selected={unitType} onTabChange={handleTabChange} />
      <br />
      <Accordion>
        {units.map(unit => (
          <UnitListItem
            key={unit.id}
            unit={unit}
            onEdit={() => onEdit(unit)}
            onDelete={() => setToDelete(unit)}
          />
        ))}
        <AddButton
          id="add-unit-button"
          onClick={() => onNew(unitType)}
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
