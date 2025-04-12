import { useContext, useEffect, useState } from "react";
import { parseUnitType, Unit, UnitType } from "../../../models/units";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Form } from "../../components/form";
import { MagnitudeEdit } from "./components/magnitude-edit";
import { TextInput } from "../../components/text-input";
import { DBContext } from "../../providers/database";
import { useForms } from "../../providers/forms";
import { NewItemButton } from "../../components/new-item-button";
import { SelectObject } from "../../components/select-object";
import { NumericInput } from "../../components/numeric-input";
import { Tooltip } from "@mui/material";

export function UnitsEdit() {
  const { returnTo, setFormResult } = useForms("units");
  const { unitStore } = useContext(DBContext);
  const params = useParams();
  const [search] = useSearchParams();

  const [isNew, setIsNew] = useState(true);
  const [unit, setUnit] = useState<Unit>({ id: 0, name: "", type: UnitType.Weight, magnitudes: [], base: 1, singular: "", plural: "" });
  const navigate = useNavigate();

  async function load() {
    if (unitStore === undefined) {
      return;
    }

    if (params.unit) {
      const unit = await unitStore.get(Number.parseInt(params.unit, 10));
      setUnit(unit);
      setIsNew(false);
      return;
    }

    const type = parseUnitType(search.get("type") || "");
    if (type) {
      console.log(`changing unit to ${type}`);
      setUnit({ ...unit, type });
    }
  }

  useEffect(() => {
    load();
  }, [unitStore]);

  function handleNewMagnitude() {
    unit.magnitudes.push({ abbrev: "", singular: "", plural: "", multiplier: 1 });
    setUnit({ ...unit });
  }

  return (
    <Form
      title={isNew ? "Units: new" : `Units: ${unit.name}`}
      returnTo={returnTo}
      onSubmit={async () => {
        unit.magnitudes.sort((a, b) => a.multiplier - b.multiplier);
        let id = unit.id;

        if (isNew) {
          id = await unitStore?.add(unit.name, unit.type, unit.magnitudes, unit.base, unit.singular, unit.plural) || 0;
        } else {
          await unitStore?.put(unit);
        }

        setFormResult("units", { field: "unit", response: id });

        navigate(returnTo);
      }}
    >
      <TextInput
        id="variant"
        variant="outlined"
        label="name"
        value={unit.name}
        lowercase
        required
        onChange={(value) => setUnit({ ...unit, name: value })}
      />
      <SelectObject
        id="unit-type"
        label="type"
        value={unit.type}
        items={Object.values(UnitType)}
        toLabel={(item) => item}
        required
        onChange={(value) => setUnit({ ...unit, type: value })}
      />
      {unit.type === UnitType.Count && (
        (<>
          <TextInput
            id="singular"
            variant="outlined"
            label="singular"
            value={unit.singular}
            lowercase
            onChange={(value) => {
              unit.singular = value;
              setUnit({ ...unit });
            }}
          />
          <TextInput
            id="plural"
            variant="outlined"
            label="plural"
            value={unit.plural}
            lowercase
            onChange={(value) => {
              unit.plural = value;
              setUnit({ ...unit });
            }}
          />
        </>)
      )}
      {unit.type !== UnitType.Count && (<>
        <NumericInput
          label="base"
          required
          info="How many of this unit type's base units (e.g. grams for weight, litres of volume) go into 1 of this unit."
          value={unit.base || 1}
          onChange={(value) => {
            console.log(value);
            unit.base = value;
            if (value <= 0) {
              unit.base = 1;
            }
            setUnit({ ...unit });
          }}
        />
        {unit.magnitudes.map((magnitude, index) => (
          <MagnitudeEdit key={index} index={index} magnitude={magnitude} onChange={(m) => {
            unit.magnitudes[index] = m;
            setUnit({ ...unit });
          }} onRemove={() => {
            unit.magnitudes.splice(index, 1);
            setUnit({ ...unit });
          }} />
        ))}

        <NewItemButton onClick={handleNewMagnitude} />
      </>)}
    </Form>
  );
}
