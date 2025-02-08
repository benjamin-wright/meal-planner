import { Box } from "@mui/material";
import { Page } from "../../components/page";
import { Panels } from "../../components/panels";
import { useContext, useEffect, useState } from "react";
import { ProgressTracker } from "../../components/progress-tracker";
import { DBContext } from "../../providers/database";
import { getDayReadable, makePlanItem, Meal, PlanItem } from "../../../models/plan-item";
import { MealList } from "./components/meal-list";
import { Recipie } from "../../../models/recipies";

export function Planner() {
  const { planItemStore, recipieStore } = useContext(DBContext);

  const [planItems, setPlanItems] = useState<PlanItem[]>([
    makePlanItem(1, 0),
    makePlanItem(2, 1),
    makePlanItem(3, 2),
    makePlanItem(4, 3),
    makePlanItem(5, 4),
    makePlanItem(6, 5),
    makePlanItem(7, 6),
  ]);

  const [recipies, setRecipies] = useState<Recipie[]>([]);

  async function load() {
    if (!planItemStore || !recipieStore) {
      return;
    }

    const recipies = await recipieStore.getAll();
    setRecipies(recipies);

    const planItems = await planItemStore.getAll();
    if (planItems.length > 0) {
      setPlanItems(planItems);
    }
  }

  useEffect(() => {
    load();
  }, [planItemStore]);

  const [selected, setSelected] = useState(0);

  function newMealHandler(day: number, meal: "breakfast" | "lunch" | "dinner", meals: Meal[]) {
    switch (meal) {
      case "breakfast": {
        planItems[day].breakfast = meals;
        break;
      }
      case "lunch": {
        planItems[day].lunch = meals;
        break;
      }
      case "dinner": {
        planItems[day].dinner = meals;
        break;
      }
    }

    setPlanItems([...planItems]);
  }

  return <Page title="Planner">
    <ProgressTracker
      active={selected}
      steps={planItems.map((item) => {
        return {
          display: getDayReadable(item.order).substring(0, 2),
          completed: false
        }
      })}
      onSelected={(selected) => setSelected(selected)}
    />
    <Panels selected={selected} onSelectedChanged={setSelected}>
      {
        planItems.map((item, index) => {
          return <Box key={item.id} height="100%" width="100%" display="flex" flexDirection="column" overflow="scroll">
            <MealList kind="breakfast" meals={item.breakfast} recipies={recipies} onChange={(meals) => newMealHandler(index, "breakfast", meals)} />
            <MealList kind="lunch" meals={item.lunch} recipies={recipies} onChange={(meals) => newMealHandler(index, "lunch", meals)}/>
            <MealList kind="dinner" meals={item.dinner} recipies={recipies} onChange={(meals) => newMealHandler(index, "dinner", meals)}/>
          </Box>
        })
      }
    </Panels>
  </ Page>;
}
