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
import { ExtraItem, MealItem } from "./components/types";
import { ArrayEquals } from "../../../utils/compare";
import { StaticMeal } from "./components/static-meal";
import { ConfirmDialog } from "../../components/confirm-dialog";
import { FloatingClearButton } from "../../components/floating-clear-button";
import { Extra } from "../../../models/extras";
import { Ingredient } from "../../../models/ingredients";
import { Unit } from "../../../models/units";
import { ExtraItemView } from "./components/extra-item-view";

function mapMealToItem(meal: Meal | undefined, index: number, day: MealDay, recipies: Recipie[]): MealItem {
  return {
    id: meal?.id,
    index: index,
    recipie: meal ? recipies.find((recipie) => recipie.id === meal.recipieId)?.name || "" : "",
    servings: meal?.servings || 0,
    day: day
  };
}

function mapExtraToItem(extra: Extra | undefined, index: number, ingredients: Ingredient[], units: Unit[]): ExtraItem {
  if (!extra) {
    return {
      id: undefined,
      index: index,
      name: "",
      quantity: "",
    };
  }

  return {
    id: extra.id,
    index: index,
    name: ingredients.find((ingredient) => ingredient.id === extra.ingredient)?.name || "",
    quantity: units.find((unit) => unit.id === extra.unit)?.format(extra.quantity, { abbr: true }) || "",
  };
}

export function Planner() {
  const { ingredientStore, unitStore, mealStore, recipieStore, extraStore } = useContext(DBContext);
  const [params] = useSearchParams();

  const [isOpen, setOpen] = useState(false);
  const [toDelete, setToDelete] = useState<MealItem | ExtraItem | null>(null);
  const [toClear, setToClear] = useState<boolean>(false);

  const [dinners, setDinners] = useState<MealItem[]>([]);
  const [lunches, setLunches] = useState<MealItem[]>([]);
  const [breakfasts, setBreakfasts] = useState<MealItem[]>([]);
  const [extras, setExtras] = useState<ExtraItem[]>([]);
  const [tab, setTab] = useState(params.get("tab") || "dinner");

  const navigate = useNavigate();

  async function load() {
    if (!unitStore || !ingredientStore || !mealStore || !recipieStore || !extraStore) {
      return;
    }

    const units = await unitStore.getAll();
    const ingredients = await ingredientStore.getAll();
    const recipies = await recipieStore.getAll();
    const meals = await mealStore.getAll();
    const extras = await extraStore.getAll();

    const dinners = MealDays.map((day, index) => {
      const meal = meals.find((meal) => meal.meal === "dinner" && meal.days.includes(day))
      return mapMealToItem(meal, index, day, recipies);
    });
    setDinners(dinners);

    setLunches(meals.filter((meal) => meal.meal === "lunch").map((meal, index) => mapMealToItem(meal, index, "saturday", recipies)));
    setBreakfasts(meals.filter((meal) => meal.meal === "breakfast").map((meal, index) => mapMealToItem(meal, index, "saturday", recipies)));
    setExtras(extras.map((extra, index) => mapExtraToItem(extra, index, ingredients, units)));
  }

  useEffect(() => {
    load();
  }, [unitStore, ingredientStore, mealStore, recipieStore, extraStore]);

  function onEdit(item: MealItem | ExtraItem) {
    if (item.id === undefined) {
      return;
    }

    if ("recipie" in item) {
      navigate(`/planner/meals/${item.id}`);
    } else {
      navigate(`/planner/extras/${item.id}`);
    }
  }

  function onAddDinner(day: MealDay) {
    navigate(`/planner/meals/new?type=dinner&day=${day}`);
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

  function onDelete(item: MealItem | ExtraItem) {
    setToDelete(item);
    setOpen(true);
  }

  async function runDelete() {
    setOpen(false);

    if (!mealStore || !extraStore) {
      return;
    }

    if (toClear) {
      await mealStore.clear();
      await extraStore.clear();
    }

    if (toDelete?.id !== undefined) {
      if ("recipie" in toDelete) {
        await mealStore.delete(toDelete.id);
      } else {
        await extraStore.delete(toDelete.id);
      }
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
      <Tab label="Extras" value="extras" />
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
              <SortableMeal meal={meal} kind="dinner" onEdit={onEdit} onDelete={onDelete} onAdd={onAddDinner} />
            </Box>)}
          </Reorder.Group>
        }
        {tab === "lunch" && lunches.map((meal) =>
          <StaticMeal
            key={meal.id}
            meal={meal}
            kind="lunch"
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
        {tab === "breakfast" && breakfasts.map((meal) =>
          <StaticMeal
            key={meal.id}
            meal={meal}
            kind="breakfast"
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
        {tab === "extras" && extras.map((extra) =>
          <ExtraItemView
            key={extra.id}
            extra={extra}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
      </DetailViewGroup>
    </Box>
    <FloatingAddButton to={ tab === "extras" ? "/planner/extras/new" : `/planner/meals/new?type=${tab}`} />
    <FloatingClearButton onClick={() => {
      setToClear(true);
      setToDelete(null);
      setOpen(true);
    }} />
    <ConfirmDialog
      message={toDelete ? `Deleting "${"recipie" in toDelete ? toDelete.recipie : toDelete.name}"` : "Clearing all meals"}
      open={isOpen}
      onConfirm={runDelete}
      onCancel={() => setOpen(false)}
    />
  </ Page>;
}
