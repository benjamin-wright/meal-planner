import Add from "@mui/icons-material/Add";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";

interface NewItemProps {
  onNewItem: () => void;
}

export function NewItem({ onNewItem }: NewItemProps) {
  return (
    <Card
      sx={{
        overflow: "unset",
      }}
    >
      <CardActionArea
        onClick={onNewItem}
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