import { Box, Card, Tab, Tabs } from "@mui/material";
import { Page } from "../../components/page";
import { useContext, useEffect, useState } from "react";
import { DBContext } from "../../providers/database";
import { Meal, MealDay, MealDays } from "../../../models/meals";
import { Recipie } from "../../../models/recipies";
import { FloatingAddButton } from "../../components/floating-add-button";
import { DetailViewGroup } from "../../components/detail-view";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Reorder } from "motion/react";
import { SortableMeal } from "./components/sortable-meal";
import { MealItem } from "./components/types";
import { ArrayEquals } from "../../../utils/compare";
import { StaticMeal } from "./components/static-meal";
import { ConfirmDialog } from "../../components/confirm-dialog";
import { FloatingClearButton } from "../../components/floating-clear-button";

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
  const [params] = useSearchParams();

  const [isOpen, setOpen] = useState(false);
  const [toDelete, setToDelete] = useState<MealItem | null>(null);
  const [toClear, setToClear] = useState<boolean>(false);

  const [dinners, setDinners] = useState<MealItem[]>([]);
  const [lunches, setLunches] = useState<MealItem[]>([]);
  const [breakfasts, setBreakfasts] = useState<MealItem[]>([]);
  const [tab, setTab] = useState(params.get("tab") || "dinner");

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

    setLunches(meals.filter((meal) => meal.meal === "lunch").map((meal, index) => mapMealToItem(meal, index, "saturday", recipies)));
    setBreakfasts(meals.filter((meal) => meal.meal === "breakfast").map((meal, index) => mapMealToItem(meal, index, "saturday", recipies)));
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

  function onDelete(meal: MealItem) {
    setToDelete(meal);
    setOpen(true);
  }

  async function runDelete() {
    setOpen(false);

    if (!mealStore) {
      return;
    }

    if (toClear) {
      await mealStore.clear();
    }

    if (toDelete?.id !== undefined) {
      await mealStore.delete(toDelete.id);
    }

    setToDelete(null);
    setToClear(false);

    await load();
  }

  return <Page title="Planner" showNav>
    <Tabs value={tab} onChange={(_event, value) => setTab(value)} variant="fullWidth">
      <Tab label="Dinner" value="dinner" />
      <Tab label="Lunch" value="lunch" />
      <Tab label="Breakfast" value="breakfast" />
      <Tab label="Misc" value="misc" />
    </Tabs>

    <Box paddingBottom="4em" overflow="scroll">
      <DetailViewGroup>
        {tab === "dinner" &&
          <Reorder.Group axis="y" values={dinners} onReorder={onReorder}>
            {dinners.map((meal) => <Box key={meal.id + "-" + meal.index} display="flex" alignItems="center" justifyContent="space-between" gap="1em">
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  width: "2.5em",
                  height: "2.5em",
                  margin: "0.5em 0",
                  textTransform: "capitalize"
                }}
              >{meal.day.substring(0, 2)}</Card>
              <SortableMeal meal={meal} kind="dinner" onEdit={(meal) => onEdit(meal.id || 0)} onDelete={(meal) => onDelete(meal)} />
            </Box>)}
          </Reorder.Group>
        }
        {tab === "lunch" && lunches.map((meal) =>
          <StaticMeal
            key={meal.id}
            meal={meal}
            kind="lunch"
            onEdit={(meal) => onEdit(meal.id || 0)}
            onDelete={(meal) => onDelete(meal)}
          />
        )}
        {tab === "breakfast" && breakfasts.map((meal) =>
          <StaticMeal
            key={meal.id}
            meal={meal}
            kind="breakfast"
            onEdit={(meal) => onEdit(meal.id || 0)}
            onDelete={(meal) => onDelete(meal)}
          />
        )}
      </DetailViewGroup>
    </Box>
    <FloatingAddButton to="/planner/new" />
    <FloatingClearButton onClick={() => {
      setToClear(true);
      setToDelete(null);
      setOpen(true);
    }} />
    <ConfirmDialog
      message={toDelete ? `Deleting "${toDelete.recipie}"` : "Clearing all meals"}
      open={isOpen}
      onConfirm={runDelete}
      onCancel={() => setOpen(false)}
    />
  </ Page>;
}
