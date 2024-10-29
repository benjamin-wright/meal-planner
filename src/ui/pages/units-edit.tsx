import { useEffect, useState } from "react";
import { Database } from "../../database";
import { Unit } from "../../database/schemas";
import { TextField } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { UnitsEditLoaderResult } from "./units-edit-loader";
import { Form } from "../components/form";

interface UnitsEditProps {
  database: Database;
}

export function UnitsEdit({ database }: UnitsEditProps) {
  const [object, setObject] = useState<Unit>({ name: "", magnitudes: [] });
  const data = useLoaderData() as UnitsEditLoaderResult;
  const navigate = useNavigate();

  useEffect(() => {
    if (data.object) {
      setObject(data.object);
    }
  }, [data.object]);

  return (
    <Form
      title={object ? `Editing ${object.name}` : "New Unit"}
      returnTo="/units"
      onSubmit={async () => {
        if (object.id) {
          await database.units.put(object);
        } else {
          await database.units.add(object);
        }
        navigate("/units");
      }}
      onCancel={() => {
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
    </Form>
  );
}
