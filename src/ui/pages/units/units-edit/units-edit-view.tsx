import { Unit, UnitType } from "../../../../models/units";
import { ObjectSelect } from "../../../components/inputs/object-select/object-select";
import { StringInput } from "../../../components/inputs/string-input/string-input";
import { Form } from "../../../components/layout/form/form";

type Props = {
  unit: Unit;
  onChange: (unit: Unit) => void;
  onNav: () => void;
  onSubmit: (unit: Unit) => void;
}

export function UnitsEditView({ unit, onChange, onNav, onSubmit }: Props) {
  return (
    <Form title={`Unit: ${unit.id ? unit.name : "New"}`} onNav={onNav} onSubmit={() => onSubmit(unit)}>
      <StringInput
        id="unit-name"
        label="Unit Name"
        value={unit.name}
        onChange={(value) => onChange({ ...unit, name: value })}
      />

      <ObjectSelect
        id="unit-type"
        label="Unit Type"
        value={unit.type}
        options={[UnitType.Weight, UnitType.Volume, UnitType.Count]}
        onChange={(value) => onChange({ ...unit, ...(value ? { type: value } : {}) })}
        toDisplay={(option) => option}
      />
    </Form>
  );
}
