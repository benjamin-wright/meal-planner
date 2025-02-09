import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { NoFood } from "@mui/icons-material";

export type MealItem = {
  id: number;
  recipie: string;
  servings: number;
}

interface MealListProps {
  kind: string;
  meals: MealItem[];
}

export function MealList({ kind, meals }: MealListProps) {
  return <Box display="flex" flexDirection="column" gap="1em">
    <Typography variant="h6" textTransform="capitalize">{kind}</Typography>
    {
      meals.length > 0 ? meals.map((meal, index) => <div key={index}>{meal.recipie}</div>) : <NoFood />
    }
  </Box>;
}
