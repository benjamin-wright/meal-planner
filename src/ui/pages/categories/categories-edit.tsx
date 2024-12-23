import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Form } from "../../components/form";
import { CategoriesEditLoaderResult } from "./categories-edit-loader";
import { Category } from "../../../models/categories";

export function CategoriesEdit() {
  const [isNew, setIsNew] = useState(true);
  const data = useLoaderData() as CategoriesEditLoaderResult;
  const [object, setObject] = useState<Category>({ id: 0, name: "", order: data.categories.length });
  const navigate = useNavigate();

  useEffect(() => {
    if (data.object) {
      setIsNew(false);
      setObject(data.object);
    }
  }, [data.object]);

  return (
    <Form
      title={isNew ? "Categories: new" : `Categories: ${object.name}`}
      returnTo="/categories"
      onSubmit={async () => {
        if (isNew) {
          await data.store.add(object.name, object.order);
        } else {
          await data.store.put(object);
        }
        navigate("/categories");
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
