import { Box, Card, Tab, Tabs, Typography } from "@mui/material";
import { Page } from "../../components/page";
import { useContext, useEffect, useState } from "react";
import { DBContext } from "../../providers/database";
import { Meal, MealDay } from "../../../models/meals";
import { Recipie } from "../../../models/recipies";
import { FloatingAddButton } from "../../components/floating-add-button";
import { DetailViewGroup } from "../../components/detail-view";
import { useNavigate } from "react-router-dom";
import { Reorder } from "motion/react";
import { SortableMeal } from "./components/sortable-meal";
import { MealItem } from "./components/types";

function mapMealToItem(meal: Meal, day: MealDay, recipies: Recipie[]): MealItem {
  return {
    id: meal.id,
    recipie: recipies.find((recipie) => recipie.id === meal.recipieId)?.name || "",
    servings: meal.servings,
    day: day
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
    const newDinners = [];
    for (const meal of meals.filter((meal) => meal.meal === "dinner")) {
      for (const day of meal.days) {
        newDinners.push(mapMealToItem(meal, day, recipies));
      }
    }
    setDinners(newDinners);
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
      {tab === "dinners" &&
        <Reorder.Group axis="y" values={dinners} onReorder={onReorder}>
          {tab === "dinners" && dinners.map((meal) => <Box key={meal.id + "-" + meal.day} display="flex" alignItems="center" justifyContent="space-between" gap="1em">
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                width: "2.5em",
                height: "2.5em",
                textTransform: "capitalize",
                // border: index === active ? "dashed 1px white" : "",
                // backgroundColor: step.completed ? "success.main" : "secondary.dark",
                // color: step.completed ? "success.contrastText" : "secondary.contrastText",
              }}
            >{meal.day.substring(0, 2)}</Card>
            <SortableMeal meal={meal} kind="dinner" onEdit={(meal) => onEdit(meal.id)} onDelete={(meal) => onDelete(meal.id)} />
          </Box>)}
        </Reorder.Group>
      }
    </DetailViewGroup>
    <FloatingAddButton to="/planner/new" />
  </ Page>;
}
