import { useEffect, useState } from "react";
import { Database } from "../../database";
import { Unit } from "../../database/schemas";
import { Card, CardActionArea, TextField } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { UnitsEditLoaderResult } from "./units-edit-loader";
import { Form } from "../components/form";
import Add from "@mui/icons-material/Add";
import { MagnitudeEdit } from "../components/magnitude-edit";

interface UnitsEditProps {
  database: Database;
}

export function UnitsEdit({ database }: UnitsEditProps) {
  const [isNew, setIsNew] = useState(false);
  const [object, setObject] = useState<Unit>({ name: "", magnitudes: [] });
  const data = useLoaderData() as UnitsEditLoaderResult;
  const navigate = useNavigate();

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
      returnTo="/units"
      onSubmit={async () => {
        if (object.id) {
          await database.units.put(object);
        } else {
          await database.units.add(object);
        }
        navigate("/units");
      }}
    >
      <TextField
        id="variant"
        variant="outlined"
        label="name"
        value={object.name}
        onChange={(e) =>
          setObject({ ...object, name: e.target.value.toLowerCase() })
        }
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
