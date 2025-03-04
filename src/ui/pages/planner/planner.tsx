import { Tab, Tabs } from "@mui/material";
import { Page } from "../../components/page";
import { useContext, useEffect, useState } from "react";
import { DBContext } from "../../providers/database";
import { Meal } from "../../../models/meals";
import { MealItem } from "./components/meal-list";
import { Recipie } from "../../../models/recipies";
import { FloatingAddButton } from "../../components/floating-add-button";
import { DetailViewGroup } from "../../components/detail-view";
import { useNavigate } from "react-router-dom";
import { Reorder } from "motion/react";
import { SortableMeal } from "./components/sortable-meal";

function mapMealToItem(meal: Meal, recipies: Recipie[]): MealItem {
  return {
    id: meal.id,
    recipie: recipies.find((recipie) => recipie.id === meal.recipieId)?.name || "",
    servings: meal.servings,
  };
}

export function Planner() {
  const { mealStore, recipieStore } = useContext(DBContext);

  const [dinners, setDinners] = useState<MealItem[]>([
    { id: 0, recipie: "Spaghetti Bolognese", servings: 2 },
    { id: 1, recipie: "Chicken Curry", servings: 4 },
  ]);
  const [tab, setTab] = useState("dinners");

  const navigate = useNavigate();

  async function load() {
    if (!mealStore || !recipieStore) {
      return;
    }

    const recipies = await recipieStore.getAll();
    const meals = await mealStore.getAll();
    // setDinners(meals.filter((meal) => meal.meal === "dinner").map((meal) => mapMealToItem(meal, recipies)));
  }

  useEffect(() => {
    load();
  }, [mealStore, recipieStore]);

  function onEdit(id: number) {
    navigate(`/planner/${id}`);
  }

  async function onReorder(newDinners: MealItem[]) {
    setDinners(newDinners);
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
      { tab === "dinners" && 
        <Reorder.Group axis="y" values={dinners} onReorder={onReorder}>
          {tab === "dinners" && dinners.map((meal, index) => <SortableMeal meal={meal} kind="dinner" onEdit={(meal) => onEdit(meal.id)} onDelete={(meal) => onDelete(meal.id)} key={meal.id} />)}
        </Reorder.Group>
      }
    </DetailViewGroup>
    <FloatingAddButton to="/planner/new" />
  </ Page>;
}
