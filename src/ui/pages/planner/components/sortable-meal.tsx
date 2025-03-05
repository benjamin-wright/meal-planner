import { Reorder, useDragControls } from "motion/react";
import { DetailView } from "../../../components/detail-view";
import { MealItem } from "./types";
import Box from "@mui/material/Box";
import { IconLink } from "../../../components/icon-link";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

interface SortableMealProps {
  meal: MealItem;
  kind: string;
  onEdit: (meal: MealItem) => void;
  onDelete: (meal: MealItem) => void;
  working?: boolean;
}

export function SortableMeal({ meal, kind, onEdit, onDelete, working }: SortableMealProps) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item key={meal.id} value={meal} dragListener={false} dragControls={dragControls} style={{ flexGrow: 1 }}>
      <DetailView id={`${kind}-${meal.id.toString()}`} key={meal.id} title={meal.recipie} chip={meal.servings.toString()} narrow horizontal dragControls={dragControls} working={working}>
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
    </Reorder.Item>
  );
}
