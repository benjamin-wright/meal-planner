import { Card, Container, Typography } from "@mui/material";
import { Category } from "../../database/schemas/categories";
import { DragHandle } from "@mui/icons-material";
import { useSortable } from "@dnd-kit/sortable";

interface CategoryViewProps {
  category: Category;
}

export function CategoryView({ category }: CategoryViewProps) {
  const { attributes, listeners, setNodeRef } = useSortable({ id: category.id || "" });

  return (
    <Card
      ref={setNodeRef}
      sx={{
        padding: "1em",
        display: "flex",
      }}
    >
      <Typography variant="h2" fontSize="1em" flexGrow="1">
        {category.name}
      </Typography>
      <Container sx={{
        width: "auto"
      }}>
        <DragHandle 
          {...attributes}
          {...listeners}
        />
      </Container>
    </Card>
  );
}
