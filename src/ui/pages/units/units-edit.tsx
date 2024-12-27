import { useState } from "react";
import { Unit } from "../../../models/units";
import { Card, CardActionArea, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { UnitsEditLoaderResult } from "./units-edit-loader";
import { Form } from "../../components/form";
import Add from "@mui/icons-material/Add";
import { MagnitudeEdit } from "../../components/magnitude-edit";

export function UnitsEdit() {
  const { isNew, unit, store } = useLoaderData() as UnitsEditLoaderResult;
  const [object, setObject] = useState<Unit>(unit);
  const [isCount, setIsCount] = useState(unit.magnitudes.length === 0);
  const [URLSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const returnTo = URLSearchParams.get("returnTo") || "/units";

  function NewMagnitude() {
    return (
      <Card
        sx={{
          overflow: "unset",
        }}
      >
        <CardActionArea
          onClick={() => {
            object.magnitudes.push({
              abbrev: "",
              singular: "",
              plural: "",
              multiplier: 1,
            });
            setObject({ ...object });
          }}
          sx={{
            padding: "1.5em",
            textAlign: "center",
          }}
        >
          <Add />
        </CardActionArea>
      </Card>
    );
  }

  function countInput() {
    return(<>
      <TextField
        id="singular"
        variant="outlined"
        label="singular"
        value={object.singular}
        onChange={(e) => {
          object.singular = e.target.value;
          setObject({ ...object });
        }}
      />
      <TextField
        id="plural"
        variant="outlined"
        label="plural"
        value={object.plural}
        onChange={(e) => {
          object.plural = e.target.value;
          setObject({ ...object });
        }}
      />
    </>)
  }

  function magnitudesInput() {
    return (<>
      {object.magnitudes.map((magnitude, index) => (
        <MagnitudeEdit key={index} magnitude={magnitude} onChange={(m) => {
          object.magnitudes[index] = m;
          setObject({ ...object });
        }} onRemove={() => {
          object.magnitudes.splice(index, 1);
          setObject({ ...object });
        }} />
      ))}

      <NewMagnitude />
    </>);
  }

  return (
    <Form
      title={isNew ? "Units: new" : `Units: ${object.name}`}
      returnTo={returnTo}
      onSubmit={async () => {
        object.magnitudes.sort((a, b) => a.multiplier - b.multiplier);

        if (isNew) {
          await store.add(object.name, object.magnitudes);
        } else {
          await store.put(object);
        }
        navigate(returnTo);
      }}
    >
      <TextField
        id="variant"
        variant="outlined"
        label="name"
        value={object.name}
        onChange={(e) =>
          setObject({ ...object, name: e.target.value })
        }
        onBlur={(e) => {
          setObject({ ...object, name: e.target.value.toLowerCase() });
        }}
      />
      <ToggleButtonGroup aria-label="kind" value={isCount} exclusive onChange={(_, value) => setIsCount(value)}>
        <ToggleButton value={true}>Count</ToggleButton>
        <ToggleButton value={false}>Magnitudes</ToggleButton>
      </ToggleButtonGroup>
      {isCount && countInput()}
      {!isCount && magnitudesInput()}
    </Form>
  );
}
