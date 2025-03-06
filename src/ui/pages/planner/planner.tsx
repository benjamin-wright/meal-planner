import { Box, Card, Tab, Tabs } from "@mui/material";
import { Page } from "../../components/page";
import { useContext, useEffect, useState } from "react";
import { DBContext } from "../../providers/database";
import { Meal, MealDay, MealDays } from "../../../models/meals";
import { Recipie } from "../../../models/recipies";
import { FloatingAddButton } from "../../components/floating-add-button";
import { DetailViewGroup } from "../../components/detail-view";
import { useNavigate } from "react-router-dom";
import { Reorder } from "motion/react";
import { SortableMeal } from "./components/sortable-meal";
import { MealItem } from "./components/types";
import { ArrayEquals } from "../../../utils/compare";

function mapMealToItem(meal: Meal | undefined, index: number, day: MealDay, recipies: Recipie[]): MealItem {
  return {
    id: meal?.id,
    index: index,
    recipie: meal ? recipies.find((recipie) => recipie.id === meal.recipieId)?.name || "" : "",
    servings: meal?.servings || 0,
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
    const dinners = MealDays.map((day, index) => {
      const meal = meals.find((meal) => meal.meal === "dinner" && meal.days.includes(day))
      return mapMealToItem(meal, index, day, recipies);
    });
    setDinners(dinners);
  }

  useEffect(() => {
    load();
  }, [mealStore, recipieStore]);

  function onEdit(id: number) {
    navigate(`/planner/${id}`);
  }

  async function onReorder(newDinners: MealItem[]) {
    if (!mealStore) {
      return;
    }

    const reordered = newDinners.map((meal, index) => {
      meal.day = MealDays[index];
      return meal;
    });

    setDinners(reordered);

    type DaysMap = Record<number, MealDay[]>;
    const daysLookup = reordered.reduce<DaysMap>((acc, meal) => {
      if (meal.id === undefined) {
        return acc;
      }

      if (acc[meal.id] === undefined) {
        acc[meal.id] = [];
      }

      acc[meal.id].push(meal.day as MealDay);
      return acc;
    }, {});

    const meals = await mealStore.getAll();
    for (const meal of meals) {
      if (!ArrayEquals(meal.days, daysLookup[meal.id] || [])) {
        meal.days = daysLookup[meal.id] || [];
        await mealStore.put(meal);
      }
    }
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
          {tab === "dinners" && dinners.map((meal) => <Box key={meal.id + "-" + meal.index} display="flex" alignItems="center" justifyContent="space-between" gap="1em">
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                width: "2.5em",
                height: "2.5em",
                margin: "1em 0",
                textTransform: "capitalize"
              }}
            >{meal.day.substring(0, 2)}</Card>
            <SortableMeal meal={meal} kind="dinner" onEdit={(meal) => onEdit(meal.id || 0)} onDelete={(meal) => onDelete(meal.id || 0)} />
          </Box>)}
        </Reorder.Group>
      }
    </DetailViewGroup>
    <FloatingAddButton to="/planner/new" />
  </ Page>;
}
