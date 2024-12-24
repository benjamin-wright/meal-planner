import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Form } from "../../components/form";
import { IngredientsEditLoaderResult } from "./ingredients-edit-loader";

type IngredientInput = {
  id: number;
  name: string;
  category?: number;
  unit?: number;
}

export function IngredientsEdit() {
  const [isNew, setIsNew] = useState(true);
  const data = useLoaderData() as IngredientsEditLoaderResult;
  const [object, setObject] = useState<IngredientInput>({ id: 0, name: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (data.object) {
      setIsNew(false);
      setObject(data.object);
    }
  }, [data.object]);

  function validate() {
    return object.category !== undefined && object.unit !== undefined && object.name !== "";
  }

  return (
    <Form
      title={isNew ? "Ingredients: new" : `Ingredients: ${object.name}`}
      returnTo="/ingredients"
      disabled={!validate()}
      onSubmit={async () => {
        if (object.category === undefined || object.unit === undefined) {
          return;
        }

        object.name = object.name.toLowerCase();

        if (isNew) {
          await data.store.add(object.name, object.category, object.unit);
        } else {
          await data.store.put({
            id: object.id,
            name: object.name,
            category: object.category,
            unit: object.unit,
          });
        }
        navigate("/ingredients");
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
    </Form>
  );
}
