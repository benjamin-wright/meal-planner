import { useState } from "react";
import { Unit } from "../../../models/units";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { UnitsEditLoaderResult } from "./units-edit-loader";
import { Form } from "../../components/form";
import { MagnitudeEdit } from "./components/magnitude-edit";
import { NewMagnitude } from "./components/new-magnitude";
import { TextInput } from "../../components/text-input";

export function UnitsEdit() {
  const { isNew, unit, store, forms } = useLoaderData() as UnitsEditLoaderResult;
  const [object, setObject] = useState<Unit>(unit);
  const [isCount, setIsCount] = useState(unit.magnitudes.length === 0);
  const navigate = useNavigate();
  const returnTo = forms.getReturn("units", "/units");

  function handleNewMagnitude() {
    object.magnitudes.push({ abbrev: "", singular: "", plural: "", multiplier: 1 });
    setObject({ ...object });
  }

  return (
    <Form
      title={isNew ? "Units: new" : `Units: ${object.name}`}
      returnTo={returnTo}
      onSubmit={async () => {
        object.magnitudes.sort((a, b) => a.multiplier - b.multiplier);
        let id = object.id;

        if (isNew) {
          id = await store.add(object.name, object.magnitudes, object.singular, object.plural);
        } else {
          await store.put(object);
        }

        forms.setResult("units", { field: "unit", response: id });

        navigate(returnTo);
      }}
    >
      <TextInput
        id="variant"
        variant="outlined"
        label="name"
        value={object.name}
        lowercase
        required
        onChange={(value) => setObject({ ...object, name: value })}
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
            value={object.singular}
            lowercase
            onChange={(value) => {
              object.singular = value;
              setObject({ ...object });
            }}
          />
          <TextInput
            id="plural"
            variant="outlined"
            label="plural"
            value={object.plural}
            lowercase
            onChange={(value) => {
              object.plural = value;
              setObject({ ...object });
            }}
          />
        </>)
      )}
      {!isCount && (<>
        {object.magnitudes.map((magnitude, index) => (
          <MagnitudeEdit key={index} index={index} magnitude={magnitude} onChange={(m) => {
            object.magnitudes[index] = m;
            setObject({ ...object });
          }} onRemove={() => {
            object.magnitudes.splice(index, 1);
            setObject({ ...object });
          }} />
        ))}

        <NewMagnitude onNewMagnitude={handleNewMagnitude} />
      </>)}
    </Form>
  );
}
