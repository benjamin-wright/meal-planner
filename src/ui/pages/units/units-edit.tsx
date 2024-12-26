import { useEffect, useState } from "react";
import { Unit } from "../../../models/units";
import { Card, CardActionArea, TextField } from "@mui/material";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { UnitsEditLoaderResult } from "./units-edit-loader";
import { Form } from "../../components/form";
import Add from "@mui/icons-material/Add";
import { MagnitudeEdit } from "../../components/magnitude-edit";

export function UnitsEdit() {
  const [isNew, setIsNew] = useState(true);
  const [object, setObject] = useState<Unit>({ id: 0, name: "", magnitudes: [] });
  const data = useLoaderData() as UnitsEditLoaderResult;
  const [URLSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const returnTo = URLSearchParams.get("returnTo") || "/units";

  useEffect(() => {
    if (data.object) {
      setIsNew(false);
      setObject(data.object);
    }
  }, [data.object]);

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

  return (
    <Form
      title={isNew ? "Units: new" : `Units: ${object.name}`}
      returnTo={returnTo}
      onSubmit={async () => {
        object.magnitudes.sort((a, b) => a.multiplier - b.multiplier);

        if (isNew) {
          await data.store.add(object.name, object.magnitudes);
        } else {
          await data.store.put(object);
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
    </Form>
  );
}
