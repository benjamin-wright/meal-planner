import { useState } from "react";
import { TextField } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Form } from "../../components/form";
import { IngredientsEditLoaderResult } from "./ingredients-edit-loader";
import { SelectID } from "../../components/select-id";
import { Category } from "../../../models/categories";

type IngredientInput = {
  id: number;
  name: string;
  category: number;
  unit: number;
}

export function IngredientsEdit() {
  const { forms, ingredient, store, categories, units, isNew } = useLoaderData() as IngredientsEditLoaderResult;
  const [object, setObject] = useState<IngredientInput>(ingredient);
  const navigate = useNavigate();

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
          await store.add(object.name, object.category, object.unit);
        } else {
          await store.put({
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

      <SelectID
        value={object.category}
        items={categories}
        id="category"
        label="category"
        link="/categories/new"
        toLabel={(category: Category) => category.name}
        onChange={(id: number) => setObject({ ...object, category: id })}
        onNav={() => { forms.push({
          to: "categories",
          from: "ingredients",
          link: location.pathname,
          body: object
        })}}
      />

      <SelectID
        value={object.unit}
        items={units}
        id="unit"
        label="unit"
        link="units/new"
        toLabel={(unit) => unit.name}
        onChange={(id: number) => setObject({ ...object, unit: id })}
        onNav={() => {
          forms.push({
            to: "units",
            from: "ingredients",
            link: location.pathname,
            body: object
          })
        }}
      />
    </Form>
  );
}
