import { Box, Tab, Tabs } from "@mui/material";
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

  const [dinners, setDinners] = useState<MealItem[]>([]);
  const [tab, setTab] = useState("dinners");

  const navigate = useNavigate();

  async function load() {
    if (!mealStore || !recipieStore) {
      return;
    }

    const recipies = await recipieStore.getAll();
    const meals = await mealStore.getAll();
    setDinners(meals.filter((meal) => meal.meal === "dinner").map((meal) => mapMealToItem(meal, recipies)));
  }

  useEffect(() => {
    load();
  }, [mealStore, recipieStore]);

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
    <Tabs value={tab} onChange={(_event, value) => setTab(value)} variant="fullWidth">
      <Tab label="Dinner" value="dinners" />
      <Tab label="Lunch" value="lunches" />
      <Tab label="Breakfast" value="breakfasts" />
    </Tabs>

    <DetailViewGroup>
      {tab === "dinners" && <MealList kind="dinner" meals={dinners} onEdit={onEdit} onDelete={onDelete} />}
    </DetailViewGroup>
    <FloatingAddButton to="/planner/new" />
  </ Page>;
}
