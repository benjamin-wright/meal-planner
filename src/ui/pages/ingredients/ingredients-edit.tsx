import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useLoaderData, useLocation, useNavigate, useSearchParams } from "react-router-dom";
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
  const [isNew, setIsNew] = useState(true);
  const data = useLoaderData() as IngredientsEditLoaderResult;
  const location = useLocation();
  const [URLSearchParams] = useSearchParams();
  const [object, setObject] = useState<IngredientInput>({ id: 0, name: "", category: 1, unit: 1 });
  const navigate = useNavigate();

  useEffect(() => {
    const newObject = data.object || { id: 0, name: "", category: 1, unit: 1 };

    if (data.object) {
      setIsNew(false);
    }

    if (URLSearchParams.get("name")) {
      newObject.name = URLSearchParams.get("name") || "";
    }

    if (URLSearchParams.get("category")) {
      newObject.category = parseInt(URLSearchParams.get("category") || "");
    }

    if (URLSearchParams.get("unit")) {
      newObject.unit = parseInt(URLSearchParams.get("unit") || "");
    }

    setObject(newObject);
  }, [data.object]);

  function validate() {
    return object.name !== "";
  }

  function selfLink(): string {
    return encodeURIComponent(`${location.pathname}?name=${object.name}&category=${object.category}&unit=${object.unit}`);
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

      <SelectID
        value={object.category}
        items={data.categories}
        id="category"
        label="category"
        link={`/categories/new?returnTo=${selfLink()}`}
        toLabel={(category: Category) => category.name}
        onChange={(id: number) => setObject({ ...object, category: id })}
      />

      <SelectID
        value={object.unit}
        items={data.units}
        id="unit"
        label="unit"
        link={`/units/new?returnTo=${selfLink()}`}
        toLabel={(unit) => unit.name}
        onChange={(id: number) => setObject({ ...object, unit: id })}
      />
    </Form>
  );
}
