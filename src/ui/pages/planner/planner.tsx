import { Box } from "@mui/material";
import { Page } from "../../components/page";
import { Panels } from "../../components/panels";
import { useContext, useState } from "react";
import { ProgressTracker } from "../../components/progress-tracker";
import { DBContext } from "../../providers/database";
import { PlanItems } from "../../../persistence/IndexedDB/plan-items";

export function Planner() {
  const { planItemStore } = useContext(DBContext);

  const [planItems, setPlanItems] = useState<PlanItems[]>([]);

  const planner = [
    { day: "Saturday" },
    { day: "Sunday" },
    { day: "Monday" },
    { day: "Tuesday" },
    { day: "Wednesday" },
    { day: "Thursday" },
    { day: "Friday" },
  ]

  const [selected, setSelected] = useState(0);

  return <Page title="Planner">
    <ProgressTracker
      active={selected}
      steps={planner.map((day) => {
        return {
          display: day.day.substring(0, 2),
          completed: false
        }
      })}
      onSelected={(selected) => setSelected(selected)}
    />
    <Panels selected={selected} onSelectedChanged={setSelected}>
      {
        planner.map((day) => {
          return <Box key={day.day} height="100%" display="flex" alignItems="center" justifyContent="center">
            <p>hi</p>
          </Box>
        })
      }
    </Panels>
  </ Page>;
}
