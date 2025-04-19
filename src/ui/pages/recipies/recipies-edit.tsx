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

export type IngredientData = {
  id: number;
  name: string;
  amount: number;
  unit: Unit;
}

export function RecipiesEdit() {
  const { returnTo } = useForms("recipies");
  const { recipieStore, unitStore, ingredientStore } = useContext(DBContext);
  const params = useParams();

  const [isNew, setIsNew] = useState(true);
  const [recipie, setRecipie] = useState<Recipie>({ id: 0, name: "", description: "", serves: 1, time: 1, ingredients: [], steps: [] });
  const [ingredients, setIngredients] = useState<IngredientData[]>([]);
  const navigate = useNavigate();

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
     
      const ingredients = [];
      for (const quantity of recipie.ingredients) {
        const ingredient = await ingredientStore.get(quantity.id);
        const unit = await unitStore.get(quantity.unit);
        
        ingredients.push({
          id: ingredient.id,
          name: ingredient.name,
          amount: quantity.quantity,
          unit: unit,
        });
      }

      setIngredients(ingredients); 
    })();
  }, [ingredientStore, unitStore, recipie]);

  function validate() {
    return recipie.name !== "";
  }

  function handleNewIngredient() {
    navigate(`/recipies/${recipie.id}/ingredients/new`);
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

      <Box display="flex" flexDirection="row" gap="1em">
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

      <IngredientsView ingredients={ingredients} onEdit={() => {}} onDelete={() => {}} onAdd={handleNewIngredient} disabled={!validate()} />

      <StepsView steps={recipie.steps} onChange={steps => setRecipie({...recipie, steps })} />
    </Form>
  );
}
