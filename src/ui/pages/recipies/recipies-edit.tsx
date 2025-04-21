import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "../../components/form";
import { TextInput } from "../../components/text-input";
import { Recipie } from "../../../models/recipies";
import { NumericInput } from "../../components/numeric-input";
import { DBContext } from "../../providers/database";
import { useForms } from "../../providers/forms";
import { IngredientsView } from "./components/ingredients-view";
import { Unit } from "../../../models/units";
import Box from "@mui/material/Box";
import { StepsView } from "./components/steps-view";
import { IngredientDialog } from "./components/ingredient-dialog";
import { Ingredient } from "../../../models/ingredients";

export function RecipiesEdit() {
  const { returnTo } = useForms("recipies");
  const { recipieStore, unitStore, ingredientStore } = useContext(DBContext);
  const params = useParams();

  const [isNew, setIsNew] = useState(true);
  const [recipie, setRecipie] = useState<Recipie>({ id: 0, name: "", description: "", serves: 1, time: 1, ingredients: [], steps: [] });
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const navigate = useNavigate();

  const [editIngredient, setEditIngredient] = useState<boolean>(false);
  const [selectedIngredient, setSelectedIngredient] = useState<number | undefined>();

  useEffect(() => {
    (async () => {
      if (!recipieStore) {
        return;
      }
      
      if (params.recipie) {
        const recipie = await recipieStore.get(Number.parseInt(params.recipie, 10));
        
        setRecipie(recipie);
        setIsNew(false);
      }
    })();
  }, [recipieStore, params.recipie]);

  useEffect(() => {
    (async () => {
      if (!ingredientStore || !unitStore) {
        return;
      }

      const ingredients = await ingredientStore.getAll();
      setIngredients(ingredients);

      const units = await unitStore.getAll();
      setUnits(units);
    })();
  }, [ingredientStore, unitStore, recipie]);

  function validate() {
    return recipie.name !== "";
  }

  return (
    <Form
      title={isNew ? "Recipies: new" : `Recipies: ${recipie.name}`}
      returnTo={returnTo}
      disabled={!validate()}
      onSubmit={async () => {
        if (isNew) {
          recipie.id = await recipieStore?.add(recipie.name, recipie.description, recipie.serves, recipie.time, recipie.ingredients, recipie.steps) || 0;
        } else {
          await recipieStore?.put(recipie);
        }
        navigate(returnTo);
      }}
    >
      <TextInput
        id="variant"
        variant="outlined"
        label="name"
        value={recipie.name}
        required
        lowercase
        onChange={(value) => setRecipie({ ...recipie, name: value })}
      />

      <TextInput
        id="description"
        variant="outlined"
        label="description"
        multiline
        value={recipie.description}
        onChange={(value) => setRecipie({ ...recipie, description: value })}
      />

      <Box display="flex" flexDirection="row" gap="1em" justifyContent={"space-between"}>
        <NumericInput
          id="serves"
          label="serves"
          value={recipie.serves}
          required
          onChange={(value) => setRecipie({ ...recipie, serves: value })}
        />

        <NumericInput
          id="time"
          label="time (mins)"
          value={recipie.time}
          required
          onChange={(value) => setRecipie({ ...recipie, time: value })}
        />
      </Box>

      <IngredientsView
        units={units}
        ingredients={ingredients}
        quantities={recipie.ingredients}
        onEdit={index => {
          setSelectedIngredient(index);
          setEditIngredient(true);
        }}
        onAdd={() => {
          setRecipie({ ...recipie, ingredients: [...recipie.ingredients, { id: 0, quantity: 1, unit: 0 }] });
          setSelectedIngredient(recipie.ingredients.length);
          setEditIngredient(true);
        }}
        disabled={!validate()}
      />

      <StepsView
        steps={recipie.steps}
        onChange={steps => setRecipie({...recipie, steps })}
      />

      {
        editIngredient && (
          <IngredientDialog
            open={editIngredient}
            onClose={() => setEditIngredient(false)}
            ingredient={recipie.ingredients[selectedIngredient || 0]}
            onChange={(ingredient) => {
              if (selectedIngredient === undefined) {
                return;
              }

              const newIngredients = [...recipie.ingredients];
              newIngredients[selectedIngredient] = ingredient;
              setRecipie({ ...recipie, ingredients: newIngredients });
              setEditIngredient(false);
            }}
            units={units}
            ingredients={ingredients}
          />
        )
      }
    </Form>
  );
}
