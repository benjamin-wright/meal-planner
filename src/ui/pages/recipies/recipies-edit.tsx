import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Form } from "../../components/form";
import { RecipiesEditLoaderResult } from "./recipies-edit-loader";
import { TextInput } from "../../components/text-input";
import { Recipie } from "../../../models/recipies";
import { NumericInput } from "../../components/numeric-input";

export function RecipiesEdit() {
  const { ingredients, recipie, store, isNew } = useLoaderData() as RecipiesEditLoaderResult;
  const [object, setObject] = useState<Recipie>(recipie);
  const navigate = useNavigate();

  function validate() {
    return object.name !== "";
  }

  return (
    <Form
      title={isNew ? "Recipies: new" : `Recipies: ${object.name}`}
      returnTo="/recipies"
      disabled={!validate()}
      onSubmit={async () => {
        if (isNew) {
          await store.add(object.name, object.description, object.serves, object.ingredients, object.steps);
        } else {
          await store.put(object);
        }
        navigate("/recipies");
      }}
    >
      <TextInput
        id="variant"
        variant="outlined"
        label="name"
        value={object.name}
        required
        lowercase
        onChange={(value) => setObject({ ...object, name: value })}
      />

      <TextInput
        id="description"
        variant="outlined"
        label="description"
        value={object.description}
        onChange={(value) => setObject({ ...object, description: value })}
      />

      <NumericInput
        id="serves"
        label="serves"
        value={object.serves}
        required
        onChange={(value) => setObject({ ...object, serves: value })}
      />
    </Form>
  );
}
