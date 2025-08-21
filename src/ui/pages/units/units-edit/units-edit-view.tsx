import { Unit } from "../../../../models/units";
import { StringInput } from "../../../components/inputs/string-input/string-input";
import { Page } from "../../../components/layout/page/page";

type Props = {
  unit: Unit;
  onChange: (unit: Unit) => void;
  onNav: () => void;
}

export function UnitsEditView({ unit, onChange, onNav }: Props) {
  return (
    <Page title={`Unit: ${unit.id ? unit.name : "New"}`} onNav={onNav}>
      <StringInput
        id="unit-name"
        label="Unit Name"
        value={unit.name}
        onChange={(value) => onChange({ ...unit, name: value })}
      />
    </Page>
  );
}
