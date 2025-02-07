import { useContext, useEffect, useState } from "react";
import { Unit } from "../../../models/units";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "../../components/form";
import { MagnitudeEdit } from "./components/magnitude-edit";
import { TextInput } from "../../components/text-input";
import { DBContext } from "../../providers/database";
import { FormContext } from "../../providers/forms";
import { NewItemButton } from "../../components/new-item-button";

export function UnitsEdit() {
  const { unitStore } = useContext(DBContext);
  const forms = useContext(FormContext);
  const params = useParams();

  const [isNew, setIsNew] = useState(true);
  const [unit, setUnit] = useState<Unit>({ id: 0, name: "", magnitudes: [], singular: "", plural: "" });
  const [isCount, setIsCount] = useState(false);
  
  const navigate = useNavigate();
  const returnTo = forms.getReturn("units", "/units");

  async function load() {
    if (unitStore === undefined) {
      return;
    }

    if (params.unit) {
      const unit = await unitStore.get(Number.parseInt(params.unit, 10));
      setUnit(unit);
      setIsCount(unit.magnitudes.length === 0);
      setIsNew(false);
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
          id = await unitStore?.add(unit.name, unit.magnitudes, unit.singular, unit.plural) || 0;
        } else {
          await unitStore?.put(unit);
        }

        forms.setResult("units", { field: "unit", response: id });

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
      <ToggleButtonGroup aria-label="kind" value={isCount} exclusive onChange={(_, value) => setIsCount(value)}>
        <ToggleButton value={true}>Count</ToggleButton>
        <ToggleButton value={false}>Magnitudes</ToggleButton>
      </ToggleButtonGroup>
      {isCount && (
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
      {!isCount && (<>
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
