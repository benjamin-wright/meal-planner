import { Card, Typography } from "@mui/material";
import { Category } from "../../database/schemas/categories";
import {
  DragSourceMonitor,
  DropTargetMonitor,
  useDrag,
  useDrop,
} from "react-dnd";

interface CategoryViewProps {
  category: Category;
}

export function CategoryView({ category }: CategoryViewProps) {
  const [{ opacity }, drag] = useDrag({
    type: "category",
    item: { id: category.id },
    collect: (monitor: DragSourceMonitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: "category",
    drop: (item: { id: string }) => {
      console.log(item.id);
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  function attachRef(el: HTMLDivElement | null) {
    drag(el);
    drop(el);
  }

  return (
    <Card
      ref={attachRef}
      sx={{
        padding: "1em",
        opacity,
        border: isOver ? "2px dashed" : "",
      }}
    >
      <Typography variant="h2" fontSize="1em">
        {category.name}
      </Typography>
    </Card>
  );
}
