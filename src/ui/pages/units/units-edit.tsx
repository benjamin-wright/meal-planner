import { useContext, useEffect, useState } from "react";
import { Unit, UnitType, sanitize, parseType, validate, Magnitude, Collective } from "../../../models/units";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Form } from "../../components/form";
import { MagnitudeEdit } from "./components/magnitude-edit";
import { TextInput } from "../../components/text-input";
import { DBContext } from "../../providers/database";
import { useForms } from "../../providers/forms";
import { NewItemButton } from "../../components/new-item-button";
import { SelectObject } from "../../components/select-object";
import { NumericInput } from "../../components/numeric-input";
import { CollectiveEdit } from "./components/collective-edit";

function usePageData(unitId: string | undefined, unitType: string | null): {unit: Unit, isNew: boolean, setUnit: (unit: Unit) => void} {
  const { unitStore } = useContext(DBContext);
  const [unit, setUnit] = useState<Unit>(sanitize({}));
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    if (!unitStore) {
      return;
    }

    (async () => {
      if (unitId) {
        const unit = await unitStore.get(Number.parseInt(unitId, 10));
        setUnit(unit);
        setIsNew(false);
        return;
      }

      if (unitType) {
        const type = parseType(unitType);
        if (type) {
          setUnit({ ...unit, type });
        }
      }
    })();
  }, [unitStore]);

  return { unit, isNew, setUnit };
}

export function UnitsEdit() {
  const { unitStore } = useContext(DBContext);
  const params = useParams();
  const [search] = useSearchParams();
  const { unit, isNew, setUnit } = usePageData(params.unit, search.get("type"));
  const navigate = useNavigate();
  const { returnTo, setFormResult } = useForms("units" + (params.unit ? `?type=${unit.type}` : ""));

  async function submit() {
    let id = unit.id;

    if (isNew) {
      id = await unitStore?.add(unit.name, unit.type, unit.magnitudes, unit.collectives, unit.base) || 0;
    } else {
      await unitStore?.put(unit);
    }

    setFormResult("units", { field: "unit", response: id });

    navigate(returnTo);
  }

  function handleBaseChange(value: number) {
    unit.base = value;
    if (value <= 0) {
      unit.base = 1;
    }
    setUnit({ ...unit });
  }

  function handleNewMagnitude() {
    unit.magnitudes.push({ abbrev: "", singular: "", plural: "", multiplier: 1 });
    setUnit({ ...unit });
  }

  function handleMagnitudeChange(index: number, magnitude: Magnitude) {
    unit.magnitudes[index] = magnitude;
    setUnit({ ...unit });
  }

  function handleMagnitudeRemove(index: number) {
    unit.magnitudes.splice(index, 1);
    setUnit({ ...unit });
  }

  function handleNewCollective() {
    unit.collectives.push({ singular: "", plural: "", multiplier: 1 });
    setUnit({ ...unit });
  }

  function handleCollectiveChange(index: number, collective: Collective) {
    unit.collectives[index] = collective;
    setUnit({ ...unit });
  }

  function handleCollectiveRemove(index: number) {
    unit.collectives.splice(index, 1);
    setUnit({ ...unit });
  }

  return (
    <Form
      title={isNew ? "Units: new" : `Units: ${unit.name}`}
      returnTo={returnTo}
      disabled={!validate(unit)}
      onSubmit={submit}
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
          {unit.collectives.map((collective, index) => <CollectiveEdit
            key={index}
            index={index}
            collective={collective}
            multiple={unit.collectives.length > 1}
            onChange={(c) => handleCollectiveChange(index, c)}
            onRemove={() => handleCollectiveRemove(index)}
          />)}
          <NewItemButton onClick={handleNewCollective} />
        </>)
      )}
      {unit.type !== UnitType.Count && (<>
        <NumericInput
          label="base"
          required
          info="How many of this unit type's base units (e.g. grams for weight, litres of volume) go into 1 of this unit."
          value={unit.base || 1}
          onChange={handleBaseChange}
        />
        {unit.magnitudes.map((magnitude, index) => (
          <MagnitudeEdit
            key={index}
            index={index}
            magnitude={magnitude}
            onChange={(m) => handleMagnitudeChange(index, m)}
            onRemove={() => handleMagnitudeRemove(index)}
          />
        ))}

        <NewItemButton onClick={handleNewMagnitude} />
      </>)}
    </Form>
  );
}
