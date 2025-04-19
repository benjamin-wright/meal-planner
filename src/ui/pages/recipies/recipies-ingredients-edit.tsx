import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "../../components/form";
import { DBContext } from "../../providers/database";
import { useForms } from "../../providers/forms";

export function RecipiesIngredientsEdit() {
  const { pushForm, formsResult } = useForms("recipies-edit");

  const { recipieStore, ingredientStore, unitStore } = useContext(DBContext);
  const params = useParams();

  const [isNew, setIsNew] = useState(true);
  const [recipie, setRecipie] = useState<Recipie>({ id: 0, name: "", description: "", serves: 1, time: 1, ingredients: [], steps: [] });
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [units, setUnits] = useState<unit[]>([]);
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

    if (formsResult) {
      const { form, response } = formsResult;
      const body = form.body as { recipie: Recipie, index: number };

      console.info("body", body);

      if (response) {
        switch (response.field) {
          case "ingredient":
            body.recipie.ingredients[body.index].id = response.response;
            break;
        }
      }

      console.info("recipie", body.recipie);

      setRecipie(body.recipie);
    }
  }

  useEffect(() => {
    load();
  }, [recipieStore, ingredientStore, unitStore, formsResult]);

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
      <IngredientsList
        ingredients={ingredients}
        units={units}
        selected={recipie.ingredients}
        changed={(newIngredients) => setRecipie({...recipie, ingredients: newIngredients})}
        onNewIngredient={(index) => {
          pushForm({ to: "ingredients", from: "recipies", link: location.pathname, body: { recipie, index } });
          navigate("/ingredients/new");
        }}
      />
    </Form>
  );
}
