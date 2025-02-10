import { Box } from "@mui/material";
import { Page } from "../../components/page";
import { Panels } from "../../components/panels";
import { useContext, useEffect, useState } from "react";
import { ProgressTracker, ProgressTrackerStep } from "../../components/progress-tracker";
import { DBContext } from "../../providers/database";
import { Meal, MealDays } from "../../../models/meals";
import { MealItem, MealList } from "./components/meal-list";
import { Recipie } from "../../../models/recipies";
import { FloatingAddButton } from "../../components/floating-add-button";
import { DetailViewGroup } from "../../components/detail-view";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  async function load() {
    if (!mealStore || !recipieStore) {
      return;
    }

    const recipies = await recipieStore.getAll();
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

  function onEdit(id: number) {
    navigate(`/planner/${id}`);
  }

  async function onDelete(id: number) {
    if (!mealStore) {
      return;
    }

    await mealStore.delete(id);
    await load();
  }

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
            <DetailViewGroup>
              <MealList kind="breakfast" meals={mealDay.breakfast} onEdit={onEdit} onDelete={onDelete} />
              <MealList kind="lunch" meals={mealDay.lunch} onEdit={onEdit} onDelete={onDelete} />
              <MealList kind="dinner" meals={mealDay.dinner} onEdit={onEdit} onDelete={onDelete} />
            </DetailViewGroup>
          </Box>
        })
      }
    </Panels>
    <FloatingAddButton to="/planner/new" />
  </ Page>;
}
