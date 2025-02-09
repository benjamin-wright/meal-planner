import { Box } from "@mui/material";
import { Page } from "../../components/page";
import { Panels } from "../../components/panels";
import { useContext, useEffect, useState } from "react";
import { ProgressTracker, ProgressTrackerStep } from "../../components/progress-tracker";
import { DBContext } from "../../providers/database";
import { Meal, MealDays } from "../../../models/meals";
import { MealItem, MealList } from "./components/meal-list";
import { Recipie } from "../../../models/recipies";

type MealDays = {
  breakfast: MealItem[];
  lunch: MealItem[];
  dinner: MealItem[];
}

function mapMealToItem(meal: Meal, recipies: Recipie[]): MealItem {
  return {
    id: meal.id,
    recipie: recipies.find((recipie) => recipie.id === meal.recipieId)?.name || "",
    servings: meal.servings,
  };
}

export function Planner() {
  const { mealStore, recipieStore } = useContext(DBContext);

  const [plan, setPlan] = useState<ProgressTrackerStep[]>([]);
  const [meals, setMeals] = useState<MealDays[]>([]);
  const [recipies, setRecipies] = useState<Recipie[]>([]);

  async function load() {
    if (!mealStore || !recipieStore) {
      return;
    }

    const recipies = await recipieStore.getAll();
    setRecipies(recipies);

    const meals = await mealStore.getAll();
    
    const mealDays = MealDays.map((day) => {
      return {
        breakfast: meals.filter((meal) => meal.day === day && meal.meal === "breakfast").map((meal) => mapMealToItem(meal, recipies)),
        lunch: meals.filter((meal) => meal.day === day && meal.meal === "lunch").map((meal) => mapMealToItem(meal, recipies)),
        dinner: meals.filter((meal) => meal.day === day && meal.meal === "dinner").map((meal) => mapMealToItem(meal, recipies)),
      };
    });
    setMeals(mealDays);

    setPlan(MealDays.map((day) => ({
      display: day.substring(0, 2),
      completed: false,
    })));
  }

  useEffect(() => {
    load();
  }, [mealStore, recipieStore]);

  const [selected, setSelected] = useState(0);

  return <Page title="Planner">
    <ProgressTracker
      active={selected}
      steps={plan}
      onSelected={(selected) => setSelected(selected)}
    />
    <Panels selected={selected} onSelectedChanged={setSelected}>
      {
        meals.map((mealDay, index) => {
          return <Box key={index} height="100%" width="100%" display="flex" flexDirection="column" overflow="scroll">
            <MealList kind="breakfast" meals={mealDay.breakfast} />
            <MealList kind="lunch" meals={mealDay.lunch} />
            <MealList kind="dinner" meals={mealDay.dinner} />
          </Box>
        })
      }
    </Panels>
  </ Page>;
}
