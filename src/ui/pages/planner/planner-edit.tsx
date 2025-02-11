import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "../../components/form";
import { DBContext } from "../../providers/database";
import { useForms } from "../../providers/forms";
import { Meal, MealDay, MealDays, MealType, MealTypes } from "../../../models/meals";
import { Recipie } from "../../../models/recipies";
import { SelectString } from "../../components/select-string";
import { NumericInput } from "../../components/numeric-input";
import { SelectID } from "../../components/select-id";
import { getAbbr } from "../../../models/units";
import { Card, List, ListItem, Table, Typography } from "@mui/material";

type IngredientItem = {
  name: string;
  quantity: number;
  units: string;
}

export function PlannerEdit() {
  const { mealStore, recipieStore, ingredientStore, unitStore } = useContext(DBContext);
  const { pushForm, formsResult, returnTo } = useForms("planner");

  const [isNew, setIsNew] = useState(true);
  const [meal, setMeal] = useState<Meal>({ id: 0, recipieId: 0, servings: 2, meal: "dinner", day: "saturday" });
  const [recipies, setRecipies] = useState<Recipie[]>([]);
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState<IngredientItem[]>([]);
  const params = useParams();

  const navigate = useNavigate();

  async function load() {
    if (mealStore === undefined || recipieStore === undefined) {
      return;
    }

    const recipies = await recipieStore.getAll();
    setRecipies(recipies);

    if (params.meal) {
      const meal = await mealStore.get(Number.parseInt(params.meal, 10));
      setMeal(meal);
      setIsNew(false);
    } else {
      const recipies = await recipieStore.getAll();
      setMeal({ ...meal, recipieId: recipies[0].id });
    }
    
    if (formsResult) {
      const { form, response } = formsResult;
      const meal = form.body as Meal;

      if (response) {
        switch (response.field) {
          case "recipie":
            meal.recipieId = response.response as number;
            break;
        }
      }

      setMeal({...meal});
    }
  }
  
  useEffect(() => {
    load();
  }, [mealStore, recipieStore, formsResult]);

  async function recipieChangeHandler(recipieId: number) {
    setMeal({...meal, recipieId});
  };

  async function servingsChangeHandler(servings: number) {
    setMeal({...meal, servings});
  }

  useEffect(() => {
    calculateIngredients();
    setIngredients([]);
    setLoading(true);
  }, [ ingredientStore, unitStore, meal.recipieId, meal.servings ]);

  async function calculateIngredients() {
    if (ingredientStore === undefined || unitStore === undefined) {
      return;
    }

    const recipie = await recipieStore?.get(meal.recipieId);
    if (recipie === undefined) {
      return;
    }

    setIngredients(await Promise.all(recipie.ingredients.map(async (ingredient) => {
      const ingredientDefinition = await ingredientStore.get(ingredient.id); 
      const unit = await unitStore.get(ingredientDefinition.unit);
      
      return {
        name: ingredientDefinition.name,
        quantity: ingredient.quantity * meal.servings,
        units: getAbbr(unit, ingredient.quantity * meal.servings),
      };
    })));

    setLoading(false);
  }

  return (
    <Form
      title={isNew ? "Meals: new" : `Meals: ${meal.day} ${meal.meal}`}
      returnTo={returnTo}
      onSubmit={async () => {
        if (isNew) {
          await mealStore?.add(meal.recipieId, meal.servings, meal.meal, meal.day) || 0;
        } else {
          await mealStore?.put(meal);
        }

        navigate(`/planner`);
      }}
    >
      <SelectID
        id="recipie"
        label="Recipie"
        value={meal.recipieId}
        items={recipies}
        link="/recipies/new/metadata"
        toLabel={(recipie) => recipie.name}
        onChange={recipieChangeHandler}
        onNav={() => pushForm({ to: "recipies", from: "planner", link: location.pathname, body: meal })}
      />

      <NumericInput
        id="servings"
        label="Servings"
        value={meal.servings}
        onChange={servingsChangeHandler} 
      />

      <SelectString
        id="day"
        label="Day"
        capitalise
        value={meal.day}
        options={MealDays}
        onChange={(value) => setMeal({...meal, day: value as MealDay})}
      />
      
      <SelectString
        id="meal"
        label="Meal"
        capitalise
        value={meal.meal}
        options={MealTypes}
        onChange={(value) => setMeal({...meal, meal: value as MealType})}
      />

      { !loading && 
        <Card>
          <Typography variant="h6" sx={{margin: "0 0.5em"}}>Ingredients</Typography>
          <List>
            {
              ingredients.map((ingredient, index) => (
                <ListItem key={index}>
                  {ingredient.name} {ingredient.quantity} {ingredient.units}
                </ListItem>
              ))
            }
          </List>
        </Card>
      }
    </Form>
  );
}
