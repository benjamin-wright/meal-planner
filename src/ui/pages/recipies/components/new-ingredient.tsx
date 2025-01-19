import Add from "@mui/icons-material/Add";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";

interface NewIngredientProps {
  onNewIngredient: () => void;
}

export function NewIngredient({ onNewIngredient }: NewIngredientProps) {
  return (
    <Card
      sx={{
        overflow: "unset",
      }}
    >
      <CardActionArea
        onClick={onNewIngredient}
        sx={{
          padding: "1.5em",
          textAlign: "center",
        }}
      >
        <Add />
      </CardActionArea>
    </Card>
  );
}