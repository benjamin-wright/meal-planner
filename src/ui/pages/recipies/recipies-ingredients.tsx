import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "../../components/form";
import { Recipie } from "../../../models/recipies";
import { IngredientsList } from "./components/ingredients-list";
import { DBContext } from "../../providers/database";
import { Ingredient } from "../../../models/ingredients";
import Typography from "@mui/material/Typography";
import { Unit } from "../../../models/units";

export function RecipiesIngredients() {
  const { recipieStore, ingredientStore, unitStore } = useContext(DBContext);
  const params = useParams();

  const [isNew, setIsNew] = useState(true);
  const [recipie, setRecipie] = useState<Recipie>({ id: 0, name: "", description: "", serves: 1, time: 1, ingredients: [], steps: [] });
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const navigate = useNavigate();

  async function load() {
    if (!recipieStore || !ingredientStore || !unitStore) {
      return;
    }
    
    const ingredients = await ingredientStore.getAll();
    const units = await unitStore?.getAll();
    
    if (params.recipie) {
      const recipie = await recipieStore.get(Number.parseInt(params.recipie, 10));
      
      setRecipie(recipie);
      setIsNew(false);
    }

    setIngredients(ingredients);
    setUnits(units);
  }

  useEffect(() => {
    load();
  }, [recipieStore]);

  function validate() {
    return recipie.name !== "";
  }

  return (
    <Form
      title={isNew ? "Recipies: new" : `Recipies: ${recipie.name}`}
      returnTo={`/recipies/${recipie.id}/metadata`}
      disabled={!validate()}
      morePages
      onSubmit={async () => {
        if (isNew) {
          recipie.id = await recipieStore?.add(recipie.name, recipie.description, recipie.serves, recipie.time, recipie.ingredients, recipie.steps) || 0;
        } else {
          await recipieStore?.put(recipie);
        }
        navigate(`/recipies/${recipie.id}/steps`);
      }}
    >
      <Typography variant="h6">Ingredients:</Typography>
      <IngredientsList ingredients={ingredients} units={units} selected={recipie.ingredients} changed={(newIngredients) => setRecipie({...recipie, ingredients: newIngredients})} />
    </Form>
  );
}
