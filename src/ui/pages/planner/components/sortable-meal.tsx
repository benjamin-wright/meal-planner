import { Reorder, useDragControls } from "motion/react";
import { DetailView } from "../../../components/detail-view";
import { MealItem } from "./types";
import Box from "@mui/material/Box";
import { IconLink } from "../../../components/icon-link";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { DoNotDisturb } from "@mui/icons-material";
import { MealDay } from "../../../../models/meals";

interface SortableMealProps {
  meal: MealItem;
  kind: string;
  onEdit: (meal: MealItem) => void;
  onDelete: (meal: MealItem) => void;
  onAdd: (day: MealDay) => void;
  working?: boolean;
}

export function SortableMeal({ meal, kind, onEdit, onDelete, onAdd, working }: SortableMealProps) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item key={meal.index} value={meal} dragListener={false} dragControls={dragControls} style={{ flexGrow: 1 }}>
      {
        meal.id === undefined ?
          <IconLink onClick={() => onAdd(meal.day as MealDay)} sx={{ padding: 0, minWidth: "fit-content" }}>
            <DoNotDisturb />
          </IconLink>
          :
          <DetailView id={`${kind}-${meal.id?.toString()}`} key={meal.id} title={meal.recipie} chip={meal.servings.toString()} narrow horizontal dragControls={dragControls} working={working}>
            <Box display="flex" flexGrow="1">
              <IconLink onClick={() => onEdit(meal)}>
                <Edit />
              </IconLink>
              <IconLink
                color="error"
                onClick={() => onDelete(meal)}
              >
                <Delete />
              </IconLink>
            </Box>
          </DetailView>
      }
    </Reorder.Item>
  );
}
