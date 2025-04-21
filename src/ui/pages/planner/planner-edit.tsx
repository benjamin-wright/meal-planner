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
import { UnitType } from "../../../models/units";
import { Card, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

type IngredientItem = {
  name: string;
  quantity: number;
  units: string;
}

export function PlannerEdit() {
  const { mealStore, recipieStore, ingredientStore, unitStore, settingStore } = useContext(DBContext);
  const { pushForm, formsResult, returnTo } = useForms("planner");

  const [isNew, setIsNew] = useState(true);
  const [settings, setSettings] = useState({ preferredVolumeUnit: 0, preferredWeightUnit: 0 });
  const [meal, setMeal] = useState<Meal>({ id: 0, recipieId: 0, servings: 2, meal: "dinner", days: [] });
  const [available, setAvailable] = useState<MealDay[]>(MealDays);
  const [recipies, setRecipies] = useState<Recipie[]>([]);
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState<IngredientItem[]>([]);
  const params = useParams();

  const navigate = useNavigate();

  async function load() {
    if (mealStore === undefined || recipieStore === undefined) {
      return;
    }

    const meals = await mealStore.getAll();
    const days = meals.filter((meal) => meal.id.toString() !== params.meal).map((meal) => meal.days).flat();
    setAvailable(MealDays.filter((day) => !days.includes(day)));

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

      setMeal({ ...meal });
    }
  }

  useEffect(() => {
    load();
  }, [mealStore, recipieStore, formsResult]);

  useEffect(() => {
    (async () => {
      if (!settingStore) {
        return;
      }

      const settings = await settingStore.get();
      setSettings(settings);
    })();
  }, [settingStore]);

  async function recipieChangeHandler(recipieId: number) {
    setMeal({ ...meal, recipieId });
  };

  async function servingsChangeHandler(servings: number) {
    setMeal({ ...meal, servings });
  }

  useEffect(() => {
    calculateIngredients();
    setIngredients([]);
    setLoading(true);
  }, [ingredientStore, unitStore, meal.recipieId, meal.servings]);

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

      let unitId = ingredientDefinition.unit ?? 0;
      switch (ingredientDefinition.unitType) {
        case UnitType.Weight:
          unitId = settings.preferredWeightUnit;
          break;
        case UnitType.Volume:
          unitId = settings.preferredVolumeUnit;
          break;
      }

      const unit = await unitStore.get(unitId);
      const finalQuantity = ingredient.quantity * meal.servings / recipie.serves;

      return {
        name: ingredientDefinition.name,
        quantity: finalQuantity,
        units: unit.toAbbr(finalQuantity),
      };
    })));

    setLoading(false);
  }

  return (
    <Form
      title={isNew ? "Meals: new" : `Meals: ${meal.days} ${meal.meal}`}
      returnTo={returnTo}
      onSubmit={async () => {
        if (meal.meal !== "dinner") {
          meal.days = [];
        }

        if (isNew) {
          await mealStore?.add(meal.recipieId, meal.servings, meal.meal, meal.days) || 0;
        } else {
          await mealStore?.put(meal);
        }

        navigate(`/planner?tab=${meal.meal}`);
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
        id="meal"
        label="Meal"
        capitalise
        value={meal.meal}
        options={MealTypes}
        onChange={(value) => setMeal({ ...meal, meal: value as MealType })}
      />

      {
        meal.meal === "dinner" &&
        <SelectString
          id="day"
          label="Day"
          required
          capitalise
          multiple
          value={meal.days}
          options={available}
          onChange={(value: any) => {
            console.info(value);
            setMeal({ ...meal, days: typeof value === "string" ? [value as MealDay] : value as MealDay[] });
          }}
        />
      }

      {!loading &&
        <Card sx={{ padding: "1em", marginTop: "1em", backgroundColor: "secondary.main" }}>
          <Table size="small" padding="none">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Ingredient</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                ingredients.map((ingredient, index) => (
                  <TableRow key={index}>
                    <TableCell>{ingredient.name}</TableCell>
                    <TableCell>{ingredient.quantity}{ingredient.units}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </Card>
      }
    </Form>
  );
}
