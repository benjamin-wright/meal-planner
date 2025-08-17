import { Unit } from "../../../models/units";
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
      <ul>
        {units.map(unit => (
          <li key={unit.id}>
            <UnitListItem unit={unit} />
          </li>
        ))}
      </ul>
    </Page>
  );
}