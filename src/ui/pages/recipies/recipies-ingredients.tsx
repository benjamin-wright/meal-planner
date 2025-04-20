import { useParams } from "react-router-dom";
import { Form } from "../../components/form"
import { useContext, useEffect, useState } from "react";
import { DBContext } from "../../providers/database";
import { Unit } from "../../../models/units";
import { IngredientQuantity, Recipie } from "../../../models/recipies";
import { Ingredient } from "../../../models/ingredients";

export function RecipiesIngredients() {
  const params = useParams();
  const { unitStore, recipieStore, ingredientStore } = useContext(DBContext);
  const [ ingredients, setIngredients ] = useState<Ingredient[]>([]);
  const [ units, setUnits ] = useState<Unit[]>([]);
  const [ recipie, setRecipie ] = useState<Recipie>({ id: 0, name: "", description: "", serves: 1, time: 1, ingredients: [], steps: [] });
  const [ ingredient, setIngredient ] = useState<IngredientQuantity>({ id: 0, quantity: 1, unit: 0 });

  useEffect(() => {
    (async () => {
      if (!unitStore || !recipieStore || !ingredientStore || !params.recipie) {
        return;
      }

      const units = await unitStore.getAll();
      setUnits(units);

      const ingredients = await ingredientStore.getAll();
      setIngredients(ingredients);

      const recipie = await recipieStore.get(Number.parseInt(params.recipie, 10));
      setRecipie(recipie);

      if (params.ingredient) {
        const ingredientIndex = Number.parseInt(params.ingredient, 10);
        if (Number.isNaN(ingredientIndex) || ingredientIndex >= recipie.ingredients.length) {
          return;
        }

        setIngredient(recipie.ingredients[ingredientIndex]);
      }
    })();
  }, [
    unitStore,
    recipieStore,
  ]);

  return (
    <Form
      returnTo={`/recipies/${params.recipie}`}
      title={`Recipies: ${recipie.name}`}>

    </Form>
  );
}