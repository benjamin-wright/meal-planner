import { Unit } from "../../../models/units";
import { Accordion } from "../../components/containers/accordion/accordion";
import { Page } from "../../components/layout/page/page";
import { UnitListItem } from "./components/unit-list-item/unit-list-item";

type Props = {
  units: Unit[];
  onNav: () => void;
}

export function UnitsView({ units, onNav }: Props) {
  return (
    <Page title="Units" onNav={onNav}>
      <h1>Units</h1>
      <Accordion>
        {units.map(unit => (
          <UnitListItem key={unit.id} unit={unit} onEdit={() => console.log('Edit clicked')} onDelete={() => console.log('Delete clicked')} />
        ))}
      </Accordion>
    </Page>
  );
}