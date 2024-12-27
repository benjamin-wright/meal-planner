import { useState } from "react";
import { TextField } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Form } from "../../components/form";
import { CategoriesEditLoaderResult } from "./categories-edit-loader";
import { Category } from "../../../models/categories";

export function CategoriesEdit() {
  const { category, isNew, store, forms } = useLoaderData() as CategoriesEditLoaderResult;
  const [object, setObject] = useState<Category>(category);
  const navigate = useNavigate();

  const returnTo = forms.getReturn("categories", "/categories");

  return (
    <Form
      title={isNew ? "Categories: new" : `Categories: ${object.name}`}
      returnTo={returnTo}
      onSubmit={async () => {
        object.name = object.name.toLowerCase();
        let id = object.id;

        if (isNew) {
          id = await store.add(object.name, object.order);
        } else {
          await store.put(object);
        }

        forms.setResult("categories", { field: "category", response: id });
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
    </Form>
  );
}
