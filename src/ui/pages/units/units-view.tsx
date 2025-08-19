import { useState } from "react";
import { parseType, Unit, UnitType } from "../../../models/units";
import { Accordion } from "../../components/containers/accordion/accordion";
import { TabHeader } from "../../components/inputs/tab-header/tab-header";
import { Page } from "../../components/layout/page/page";
import { UnitListItem } from "./components/unit-list-item/unit-list-item";

type Props = {
  units: Unit[];
  onNav: () => void;
  onEdit: (unit: Unit) => void;
  onDelete: (unit: Unit) => void;
}

export function UnitsView({ units, onNav, onEdit, onDelete }: Props) {
  const [selectedTab, setSelectedTab] = useState<UnitType>(UnitType.Weight);

  function handleTabChange(tab: string) {
    const type = parseType(tab);
    if (type) {
      setSelectedTab(type);
    }
  }

  return (
    <Page title="Units" onNav={onNav}>
      <TabHeader id="units-tabs" tabs={[UnitType.Weight, UnitType.Volume]} selected={selectedTab} onTabChange={handleTabChange} />
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
      </Accordion>
    </Page>
  );
}
