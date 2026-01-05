import { useState } from "react";
import { Magnitude, Unit, UnitType, validate } from "../../../../models/units";
import { ButtonRow } from "../../../components/containers/button-row/button-row";
import { AddButton } from "../../../components/inputs/add-button/add-button";
import { DeleteButton } from "../../../components/inputs/delete-button/delete-button";
import { Fieldset } from "../../../components/inputs/fieldset/fieldset";
import { ObjectSelect } from "../../../components/inputs/object-select/object-select";
import { StringInput } from "../../../components/inputs/string-input/string-input";
import { Form } from "../../../components/layout/form/form";
import { MagnitudeEdit } from "./components/magnitude-edit";
import { NumericInput } from "../../../components/inputs/numeric-input/numeric-input";

type Props = {
  unit: Unit;
  onChange: (unit: Unit) => void;
  onSubmit: () => void;
}

export function UnitsEditView({ unit, onChange, onSubmit }: Props) {
  const [deleting, setDeleting] = useState(false);

  function handleNewMagnitude() {
    unit.magnitudes.push({ singular: "", plural: "", abbrev: "", multiplier: 1 });
    onChange({ ...unit });
  }

  function handleMagnitudeChange(updated: Magnitude, index: number) {
    unit.magnitudes[index] = updated;
    onChange({ ...unit });
  }

  function handleMagnitudeDeleted(index: number) {
    unit.magnitudes.splice(index, 1);
    onChange({ ...unit });
    if (unit.magnitudes.length === 0) {
      setDeleting(false);
    }
  }

  return (
    <Form
      title={`Unit: ${unit.id ? unit.name : "New"}`}
      onSubmit={onSubmit}
      disableSubmit={deleting || !validate(unit)}
    >
      <StringInput
        id="unit-name"
        label="Unit Name"
        value={unit.name}
        onChange={(value) => onChange({ ...unit, name: value })}
        disabled={deleting}
        lowercase
      />

      <ObjectSelect
        id="unit-type"
        label="Unit Type"
        value={unit.type}
        options={[UnitType.Weight, UnitType.Volume, UnitType.Count]}
        onChange={(value) => onChange({ ...unit, ...(value ? { type: value } : {}) })}
        toDisplay={(option) => option}
        disabled={deleting}
      />

      <NumericInput
        id="unit-base"
        label="Base Multiplier"
        value={unit.base}
        onChange={(value) => onChange({ ...unit, base: value })}
        disabled={deleting}
      />

      <Fieldset group label="Magnitudes" id="unit-magnitudes">
        {unit.magnitudes.map((magnitude, index) => (
          <MagnitudeEdit
            id={`magnitude-${index}`}
            key={index}
            magnitude={magnitude}
            hideMultiplier={unit.magnitudes.length === 1}
            hideAbbrev={unit.type === UnitType.Count}
            deleting={deleting}
            onChange={(updated) => handleMagnitudeChange(updated, index)}
            onDelete={() => handleMagnitudeDeleted(index)} />
        ))}
        <ButtonRow>
          <AddButton id="new-magnitude-button" onClick={handleNewMagnitude} disabled={deleting} />
          <DeleteButton
            id="delete-magnitudes-button"
            deleting={deleting}
            disabled={unit.magnitudes.length === 0}
            onClick={() => setDeleting(!deleting)}
          />
        </ButtonRow>
      </Fieldset>
    </Form>
  );
}
