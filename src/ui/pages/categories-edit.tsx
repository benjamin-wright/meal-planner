import { useEffect, useState } from "react";
import { Database } from "../../database";
import { Category } from "../../database/schemas";
import { TextField } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Form } from "../components/form";
import { CategoriesEditLoaderResult } from "./categories-edit-loader";

interface CategoriesEditProps {
  database: Database;
}

export function CategoriesEdit({ database }: CategoriesEditProps) {
  const [isNew, setIsNew] = useState(true);
  const data = useLoaderData() as CategoriesEditLoaderResult;
  const [object, setObject] = useState<Category>({ name: "", order: data.categories.length });
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
        if (object.id) {
          await database.categories.put(object);
        } else {
          await database.categories.add(object);
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
