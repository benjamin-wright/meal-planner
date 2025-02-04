import { Box, Typography } from "@mui/material";
import { Page } from "../../components/page";
import { Panels } from "../../components/panels";
import { useContext, useEffect, useState } from "react";
import { ProgressTracker } from "../../components/progress-tracker";
import { DBContext } from "../../providers/database";
import { getDayReadable, makePlanItem, PlanItem } from "../../../models/plan-item";
import { MealList } from "./components/meal-list";

export function Planner() {
  const { planItemStore } = useContext(DBContext);

  const [planItems, setPlanItems] = useState<PlanItem[]>([
    makePlanItem(1, 0),
    makePlanItem(2, 1),
    makePlanItem(3, 2),
    makePlanItem(4, 3),
    makePlanItem(5, 4),
    makePlanItem(6, 5),
    makePlanItem(7, 6),
  ]);

  useEffect(() => {
    if (!planItemStore) {
      return;
    }

    // planItemStore.getAll().then((items) => {
    //   setPlanItems(items);
    // });
  }, [planItemStore]);

  const [selected, setSelected] = useState(0);

  return <Page title="Planner">
    <Panels selected={selected} onSelectedChanged={setSelected}>
      {
        planItems.map((item) => {
          return <Box key={item.id} height="100%" width="100%" display="flex" flexDirection="column">
            <MealList kind="breakfast" meals={item.breakfast} />
            <MealList kind="lunch" meals={item.lunch} />
            <MealList kind="dinner" meals={item.dinner} />
          </Box>
        })
      }
    </Panels>
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
  </ Page>;
}
