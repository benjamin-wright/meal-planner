import { useEffect, useState } from "react";
import { Database } from "../../database";
import { Ingredient } from "../../database/schemas";
import { TextField } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Form } from "../components/form";
import { IngredientsEditLoaderResult } from "./ingredients-edit-loader";

interface IngredientsEditProps {
  database: Database;
}

type IngredientInput = {
  id?: number;
  name: string;
  category?: number;
  unit?: number;
}

export function IngredientsEdit({ database }: IngredientsEditProps) {
  const [isNew, setIsNew] = useState(true);
  const data = useLoaderData() as IngredientsEditLoaderResult;
  const [object, setObject] = useState<IngredientInput>({ name: "" });
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

        const ingredient = {
          id: object.id,
          name: object.name,
          category: object.category,
          unit: object.unit,
        }

        if (ingredient.id) {
          await database.ingredients.put(ingredient);
        } else {
          await database.ingredients.add(ingredient);
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
