import { Box } from "@mui/material";
import { Page } from "../../components/page";
import { Panels } from "../../components/panels";
import { useState } from "react";
import { ProgressTracker } from "../../components/progress-tracker";

export function Planner() {
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
    <ProgressTracker steps={planner.map((day, index) => {
      return {
        display: day.day.substring(0, 2),
        completed: index < selected
      }
    })} />
    <Panels onSelectedChanged={setSelected}>
      {
        planner.map((day) => {
          return <Box key={day.day}>
          </Box>
        })
      }
    </Panels>
  </ Page>;
}
