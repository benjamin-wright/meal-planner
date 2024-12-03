import { Card, CardActionArea, Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Category } from "../../database/schemas/categories";
import { DetailView } from "./detail-view";
import { IconLink } from "./icon-link";
import { DragControls } from "motion/react";

import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";


interface CategoryViewProps {
  category: Category;
  onEdit?: (category: Category) => void;
  onDelete?: (category: Category) => void;
  dragControls?: DragControls;
}

export function CategoryView({ category, onEdit, onDelete, dragControls }: CategoryViewProps) {
  return (
    <DetailView title={category.name} horizontal narrow dragControls={dragControls}>
      <Box display="flex" flexGrow="1">
        <IconLink onClick={() => onEdit && onEdit(category)}>
          <Edit />
        </IconLink>
        <IconLink
          color="error"
          onClick={() => onDelete && onDelete(category)}
        >
          <Delete />
        </IconLink>
      </Box>
    </DetailView>
  )
}
