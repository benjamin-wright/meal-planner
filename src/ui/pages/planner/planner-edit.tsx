import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form } from "../../components/form";
import { DBContext } from "../../providers/database";
import { useForms } from "../../providers/forms";
import { Meal, MealDay, MealDays, MealType, MealTypes } from "../../../models/meals";
import { Recipie } from "../../../models/recipies";
import { SelectString } from "../../components/select-string";
import { NumericInput } from "../../components/numeric-input";
import { SelectID } from "../../components/select-id";

export function PlannerEdit() {
  const { mealStore, recipieStore } = useContext(DBContext);
  const { forms, formsResult, returnTo } = useForms("planner");

  const [isNew, setIsNew] = useState(true);
  const [meal, setMeal] = useState<Meal>({ id: 0, recipieId: 0, servings: 2, meal: "dinner", day: "saturday" });
  const [recipies, setRecipies] = useState<Recipie[]>([]);
  const params = useParams();

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

  return (
    <Form
      title={isNew ? "Meals: new" : `Meals: ${meal.day} ${meal.meal}`}
      returnTo={returnTo}
      onSubmit={async () => {
        let id = meal.id;

        if (isNew) {
          id = await mealStore?.add(meal.recipieId, meal.servings, meal.meal, meal.day) || 0;
        } else {
          await mealStore?.put(meal);
        }


      }}
    >
      <SelectID
        id="recipie"
        label="Recipie"
        value={meal.recipieId}
        items={recipies}
        link="/recipies/new/metadata"
        toLabel={(recipie) => recipie.name}
        onChange={(value) => setMeal({...meal, recipieId: value})}
        onNav={() => forms.push({ to: "recipies", from: "planner", link: location.pathname, body: meal })}
      />

      <NumericInput
        id="servings"
        label="Servings"
        value={meal.servings}
        onChange={(value) => setMeal({...meal, servings: value})} 
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
    </Form>
  );
}
