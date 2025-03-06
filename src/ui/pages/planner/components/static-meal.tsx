import { DetailView } from "../../../components/detail-view";
import { MealItem } from "./types";
import Box from "@mui/material/Box";
import { IconLink } from "../../../components/icon-link";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

interface StaticMealProps {
  meal: MealItem;
  kind: string;
  onEdit: (meal: MealItem) => void;
  onDelete: (meal: MealItem) => void;
  working?: boolean;
}

export function StaticMeal({ meal, kind, onEdit, onDelete, working }: StaticMealProps) {
  return (
    <DetailView id={`${kind}-${meal.id?.toString()}`} key={meal.id} title={meal.recipie} chip={meal.servings.toString()} narrow horizontal working={working}>
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
  );
}
