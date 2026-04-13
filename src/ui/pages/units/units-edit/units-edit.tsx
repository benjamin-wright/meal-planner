import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useUnit } from "../../../hooks/useUnit";
import { Magnitude, UnitType, validate } from "../../../../models/units";
import { ButtonRow } from "../../../components/containers/button-row/button-row";
import { AddButton } from "../../../components/inputs/add-button/add-button";
import { DeleteButton } from "../../../components/inputs/delete-button/delete-button";
import { Fieldset } from "../../../components/inputs/fieldset/fieldset";
import { ObjectSelect } from "../../../components/inputs/object-select/object-select";
import { StringInput } from "../../../components/inputs/string-input/string-input";
import { Form } from "../../../components/layout/form/form";
import { MagnitudeEdit } from "./components/magnitude-edit";
import { NumericInput } from "../../../components/inputs/numeric-input/numeric-input";

export function UnitsEdit() {
  const navigate = useNavigate();
  const params = useParams();
  const [search] = useSearchParams();
  const unitId = params.id ? parseInt(params.id, 10) : null;
  const type = search.get("type") as UnitType | undefined;

  const [unit, setUnit, saveUnit] = useUnit(unitId, type);
  const [deleting, setDeleting] = useState(false);

  async function handleSubmit() {
    await saveUnit();
    navigate(-1);
  }

  function handleNewMagnitude() {
    unit.magnitudes.push({ singular: "", plural: "", abbrev: "", multiplier: 1 });
    setUnit({ ...unit });
  }

  function handleMagnitudeChange(updated: Magnitude, index: number) {
    unit.magnitudes[index] = updated;
    setUnit({ ...unit });
  }

  function handleMagnitudeDeleted(index: number) {
    unit.magnitudes.splice(index, 1);
    setUnit({ ...unit });
    if (unit.magnitudes.length === 0) {
      setDeleting(false);
    }
  }

  return (
    <Form
      title={`Unit: ${unit.id ? unit.name : "New"}`}
      onSubmit={handleSubmit}
      disableSubmit={deleting || !validate(unit)}
    >
      <StringInput
        id="unit-name"
        label="Unit Name"
        value={unit.name}
        onChange={(value) => setUnit({ ...unit, name: value })}
        disabled={deleting}
        lowercase
      />

      <ObjectSelect
        id="unit-type"
        label="Unit Type"
        value={unit.type}
        options={[UnitType.Weight, UnitType.Volume, UnitType.Count]}
        onChange={(value) => setUnit({ ...unit, ...(value ? { type: value } : {}) })}
        toDisplay={(option) => option}
        disabled={deleting}
      />

      <NumericInput
        id="unit-base"
        label="Base Multiplier"
        value={unit.base}
        onChange={(value) => setUnit({ ...unit, base: value })}
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
