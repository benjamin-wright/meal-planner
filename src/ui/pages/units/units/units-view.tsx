import { parseType, Unit, UnitType } from "../../../../models/units";
import { Accordion } from "../../../components/containers/accordion/accordion";
import { TabHeader } from "../../../components/inputs/tab-header/tab-header";
import { Page } from "../../../components/layout/page/page";
import { UnitListItem } from "./components/unit-list-item/unit-list-item";
import { AddButton } from "../../../components/inputs/add-button/add-button";

type Props = {
  units: Unit[];
  unitType: UnitType;
  onTypeChanged: (type: UnitType) => void;
  onBack: () => void;
  onEdit: (unit: Unit) => void;
  onDelete: (unit: Unit) => void;
  onNew: () => void;
}

export function UnitsView({ units, unitType, onTypeChanged, onBack, onEdit, onDelete, onNew }: Props) {
  function handleTabChange(tab: string) {
    const type = parseType(tab);
    if (type) {
      onTypeChanged(type);
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
            onDelete={() => onDelete(unit)}
          />
        ))}
        <AddButton
          id="add-unit-button"
          onClick={onNew}
        />
      </Accordion>
    </Page>
  );
}
