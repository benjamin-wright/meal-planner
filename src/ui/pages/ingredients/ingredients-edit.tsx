import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Form } from "../../components/form";
import { IngredientsEditLoaderResult } from "./ingredients-edit-loader";

type IngredientInput = {
  id: number;
  name: string;
  category: number;
  unit: number;
}

export function IngredientsEdit() {
  const [isNew, setIsNew] = useState(true);
  const data = useLoaderData() as IngredientsEditLoaderResult;
  const [object, setObject] = useState<IngredientInput>({ id: 0, name: "", category: 1, unit: 1 });
  const navigate = useNavigate();

  useEffect(() => {
    if (data.object) {
      setIsNew(false);
      setObject(data.object);
    }
  }, [data.object]);

  function validate() {
    return object.name !== "";
  }

  return (
    <Form
      title={isNew ? "Ingredients: new" : `Ingredients: ${object.name}`}
      returnTo="/ingredients"
      disabled={!validate()}
      onSubmit={async () => {
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

      <FormControl variant="outlined">
        <InputLabel id="category-label">category</InputLabel>
        <Select
          id="category"
          labelId="category-label"
          label="category"
          value={object.category}
          onChange={(e) => setObject({ ...object, category: e.target.value as number })}
        >
          {data.categories.map((category) => (
            <MenuItem
              key={category.id}
              value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined">
        <InputLabel id="unit-label">unit</InputLabel>
        <Select
          id="unit"
          labelId="unit-label"
          label="unit"
          value={object.unit}
          onChange={(e) => setObject({ ...object, unit: e.target.value as number })}
        >
          {data.units.map((unit) => (
            <MenuItem
              key={unit.id}
              value={unit.id}>
              {unit.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Form>
  );
}
