import { useState } from "react";
import { parseType, Unit, UnitType } from "../../../models/units";
import { Accordion } from "../../components/containers/accordion/accordion";
import { TabHeader } from "../../components/inputs/tab-header/tab-header";
import { Page } from "../../components/layout/page/page";
import { UnitListItem } from "./components/unit-list-item/unit-list-item";
import { AddButton } from "../../components/inputs/add-button/add-button";

type Props = {
  units: Unit[];
  onBack: () => void;
  onEdit: (unit: Unit) => void;
  onDelete: (unit: Unit) => void;
  onNew: () => void;
}

export function UnitsView({ units, onBack, onEdit, onDelete, onNew }: Props) {
  const [selectedTab, setSelectedTab] = useState<UnitType>(UnitType.Weight);

  function handleTabChange(tab: string) {
    const type = parseType(tab);
    if (type) {
      setSelectedTab(type);
    }
  }

  return (
    <Page title="Units" onNav={onBack}>
      <TabHeader id="units-tabs" tabs={[UnitType.Weight, UnitType.Volume, UnitType.Count]} selected={selectedTab} onTabChange={handleTabChange} />
      <br />
      <Accordion>
        {units.filter(unit => unit.type === selectedTab).map(unit => (
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
