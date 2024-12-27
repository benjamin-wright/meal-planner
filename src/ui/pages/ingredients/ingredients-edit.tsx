import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Form } from "../../components/form";
import { IngredientsEditLoaderResult } from "./ingredients-edit-loader";
import { SelectID } from "../../components/select-id";
import { Category } from "../../../models/categories";
import { Ingredient } from "../../../models/ingredients";
import { TextInput } from "../../components/text-input";

export function IngredientsEdit() {
  const { forms, ingredient, store, categories, units, isNew } = useLoaderData() as IngredientsEditLoaderResult;
  const [object, setObject] = useState<Ingredient>(ingredient);
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
      <TextInput
        id="variant"
        variant="outlined"
        label="name"
        value={object.name}
        required
        lowercase
        onChange={(value) => setObject({ ...object, name: value })}
      />

      <SelectID
        value={object.category}
        items={categories}
        id="category"
        label="category"
        link="/categories/new"
        required
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
        link="/units/new"
        required
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
