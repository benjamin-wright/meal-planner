import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "../../components/form";
import { TextInput } from "../../components/text-input";
import { IngredientQuantity, Recipie } from "../../../models/recipies";
import { NumericInput } from "../../components/numeric-input";
import { DBContext } from "../../providers/database";
import { useForms } from "../../providers/forms";
import { IngredientsView } from "./components/ingredients-view";
import { Unit } from "../../../models/units";
import Box from "@mui/material/Box";
import { StepsView } from "./components/steps-view";
import { IngredientDialog } from "./components/ingredient-dialog";
import { Ingredient } from "../../../models/ingredients";
import { MealTypes } from "../../../models/meals";
import { SelectString } from "../../components/select-string";

type FormsData = {
  recipie: Recipie,
  selectedIngredient: number,
}

export function RecipiesEdit() {
  const { returnTo, formsResult, setFormResult, pushForm } = useForms("recipies");
  const { recipieStore, unitStore, ingredientStore } = useContext(DBContext);
  const params = useParams();

  const [isNew, setIsNew] = useState(true);
  const [recipie, setRecipie] = useState<Recipie>({ id: 0, name: "", description: "", serves: 1, time: 1, ingredients: [], steps: [], meal: "dinner" });
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const navigate = useNavigate();

  const [editIngredient, setEditIngredient] = useState<boolean>(false);
  const [selectedIngredient, setSelectedIngredient] = useState<number | undefined>();

  useEffect(() => {
    (async () => {
      if (!recipieStore || !ingredientStore || !unitStore) {
        return;
      }

      const ingredients = await ingredientStore.getAll();
      setIngredients(ingredients);

      const units = await unitStore.getAll();
      setUnits(units);
      
      if (params.recipie) {
        const recipie = await recipieStore.get(Number.parseInt(params.recipie, 10));
        
        setRecipie(recipie);
        setIsNew(false);
      }

      if (formsResult) {
        const { form, response } = formsResult;
        const data = form.body as FormsData;
        const recipie = data.recipie;
        setRecipie(recipie);

        if (data.selectedIngredient === undefined || data.selectedIngredient < 0 || data.selectedIngredient >= recipie.ingredients.length) {
          return;
        }

        setSelectedIngredient(data.selectedIngredient);
        setEditIngredient(true);

        if (response) {
          switch (response.field) {
            case "ingredient":
              recipie.ingredients[data.selectedIngredient].id = response.response as number;
              break;
            case "unit":
              recipie.ingredients[data.selectedIngredient].unit = response.response as number;
              break;
          }

          setIsNew(recipie.id === 0);
        }
      }
    })();
  }, [recipieStore, unitStore, ingredientStore, params.recipie, formsResult]);

  function validate() {
    return recipie.name !== "";
  }

  function onIngredientEdit(index: number) {
    setSelectedIngredient(index);
    setEditIngredient(true);
  }

  function onIngredientAdd() {
    setRecipie({ ...recipie, ingredients: [...recipie.ingredients, { id: 1, quantity: 1, unit: 1 }] });
    setSelectedIngredient(recipie.ingredients.length);
    setEditIngredient(true);
  }

  function onIngredientChange(ingredient: IngredientQuantity) {
    if (selectedIngredient === undefined) {
      return;
    }

    const newIngredients = [...recipie.ingredients];
    newIngredients[selectedIngredient] = ingredient;
    setRecipie({ ...recipie, ingredients: newIngredients });
  }

  function onIngredientDelete() {
    if (selectedIngredient === undefined) {
      return;
    }

    const newIngredients = [...recipie.ingredients];
    newIngredients.splice(selectedIngredient, 1);
    setRecipie({ ...recipie, ingredients: newIngredients });
    setEditIngredient(false);
  }

  async function onSubmit() {
    if (isNew) {
      recipie.id = await recipieStore?.add(recipie.name, recipie.description, recipie.serves, recipie.time, recipie.ingredients, recipie.steps, recipie.meal) || 0;
    } else {
      await recipieStore?.put(recipie);
    }
    setFormResult("recipies", { field: "recipie", response: recipie.id });
    navigate(returnTo);
  }

  return (
    <Form
      title={isNew ? "Recipies: new" : `Recipies: ${recipie.name}`}
      returnTo={returnTo}
      disabled={!validate()}
      onSubmit={onSubmit}
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

      <SelectString
        id="meal"
        label="meal"
        value={recipie.meal}
        options={MealTypes}
        required
        capitalise
        onChange={meal => setRecipie({ ...recipie, meal: meal as any })}
      />

      <IngredientsView
        units={units}
        ingredients={ingredients}
        quantities={recipie.ingredients}
        onEdit={onIngredientEdit}
        onAdd={onIngredientAdd}
      />

      <StepsView
        steps={recipie.steps}
        onChange={steps => setRecipie({...recipie, steps })}
      />

      {
        editIngredient && (
          <IngredientDialog
            index={selectedIngredient || 0}
            open={editIngredient}
            onClose={() => setEditIngredient(false)}
            ingredient={recipie.ingredients[selectedIngredient || 0]}
            units={units}
            ingredients={ingredients}
            onChange={onIngredientChange}
            onDelete={onIngredientDelete}
            onNewIngredient={() => pushForm({ to: "ingredients", from: "recipies", link: location.pathname, body: {
              recipie,
              selectedIngredient: selectedIngredient,
            }})}
            onNewUnit={() => pushForm({ to: "units", from: "recipies", link: location.pathname, body: {
              recipie,
              selectedIngredient: selectedIngredient,
            }})}
          />
        )
      }
    </Form>
  );
}
