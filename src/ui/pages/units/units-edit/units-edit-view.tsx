import { Unit, UnitType } from "../../../../models/units";
import { AddButton } from "../../../components/inputs/add-button/add-button";
import { Fieldset } from "../../../components/inputs/fieldset/fieldset";
import { ObjectSelect } from "../../../components/inputs/object-select/object-select";
import { StringInput } from "../../../components/inputs/string-input/string-input";
import { Form } from "../../../components/layout/form/form";
import { MagnitudeEdit } from "./components/magnitude-edit";

type Props = {
  unit: Unit;
  onChange: (unit: Unit) => void;
  onNav: () => void;
  onSubmit: (unit: Unit) => void;
}

export function UnitsEditView({ unit, onChange, onNav, onSubmit }: Props) {
  function handleNewMagnitude() {
    unit.magnitudes.push({ singular: "", plural: "", abbrev: "", multiplier: 1 });
    onChange({ ...unit });
  }

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

      {
        unit.type === UnitType.Count ?
          <Fieldset group label="Collectives" id="unit-collectives">
            <AddButton id="new-collective-button" onClick={() => { }} />
          </Fieldset>
          :
          <Fieldset group label="Magnitudes" id="unit-magnitudes">
            {unit.magnitudes.map((magnitude, index) => (
              <MagnitudeEdit id={`magnitude-${index}`} key={index} magnitude={magnitude} onChange={(updated) => {
                unit.magnitudes[index] = updated;
                onChange({ ...unit });
              }} onDelete={() => {
                unit.magnitudes.splice(index, 1);
                onChange({ ...unit });
              }} />
            ))}
            <AddButton id="new-magnitude-button" onClick={handleNewMagnitude} />
          </Fieldset>
      }
    </Form>
  );
}
