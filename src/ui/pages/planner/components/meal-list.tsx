import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { NoFood } from "@mui/icons-material";
import { DetailView } from "../../../components/detail-view";
import { IconLink } from "../../../components/icon-link";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

export type MealItem = {
  id: number;
  recipie: string;
  servings: number;
}

interface MealListProps {
  kind: string;
  meals: MealItem[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function MealList({ kind, meals, onEdit, onDelete }: MealListProps) {
  return <Box display="flex" flexDirection="column" gap="1em" paddingBottom="1em">
    <Typography variant="h6" textTransform="capitalize">{kind}</Typography>
    {
      meals.length > 0
      ?
      meals.map((meal, index) =>
        <DetailView id={`${kind}-${meal.id.toString()}`} key={index} title={meal.recipie} narrow horizontal>
          <Box display="flex" flexGrow="1">
            <IconLink onClick={() => onEdit(meal.id)}>
              <Edit />
            </IconLink>
            <IconLink
              color="error"
              onClick={() => onDelete(meal.id)}
            >
              <Delete />
            </IconLink>
          </Box>
        </DetailView>
      )
      :
      <NoFood color="disabled" />
    }
  </Box>;
}
