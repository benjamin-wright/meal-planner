import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Form } from "../../components/form";
import { CategoriesEditLoaderResult } from "./categories-edit-loader";
import { Category } from "../../../models/categories";
import { TextInput } from "../../components/text-input";

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
      <TextInput
        id="variant"
        variant="outlined"
        label="name"
        value={object.name}
        lowercase
        required
        onChange={(value) =>
          setObject({ ...object, name: value })
        }
      />
    </Form>
  );
}
